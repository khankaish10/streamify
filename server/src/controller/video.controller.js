import asyncHandler from '../utils/asyncHandler.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'
import Video from '../model/video.model.js'
import Comment from '../model/comment.js'
import mongoose from 'mongoose'
import Subscription from '../model/subscription.model.js'
import WatchHistory from '../model/watchHistory.model.js'
import User from '../model/user.model.js'


const uploadAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration, tags } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!req.files) {
        throw errorResponse(res, "Video file is required", 400);
    }

    const videoUpload = await uploadToCloudinary(req.files.videoFile[0].path);
    const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].path);

    // Save video to MongoDB
    const newVideo = await Video.create({
        title,
        videoFile: videoUpload,
        thumbnail: thumbnailUpload,
        description,
        duration,
        tags: tags ? tags.split(",") : [],
        owner: userId,
    });

    return successResponse(res, "video uploaded", newVideo, 200)
})

const getvideo = asyncHandler(async (req, res) => {
    const { videoid } = req.params;
    const { currentUserId } = req?.body;

    const pipeline = [
        {
            $match: { _id: new mongoose.Types.ObjectId(videoid) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $lookup: {
                from: 'subscriptions',
                localField: 'owner._id',
                foreignField: 'subscribeTo',
                as: 'subscriptions'
            },

        },
        {
            $addFields: {
                subscriberCount: { $size: "$subscriptions" } // Count total subscribers
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'video',
                as: 'comments',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'owner',
                            foreignField: '_id',
                            as: 'commentowner'
                        }
                    },
                    { $unwind: "$commentowner" },
                    {
                        $project: {
                            "commentowner.password": 0,
                            "commentowner.coverImage": 0,
                            "commentowner.email": 0,
                            "commentowner.fullName": 0,
                            "commentowner.refreshToken": 0,
                            "commentowner.watchHistory": 0,
                            "commentowner.__v": 0,
                        }
                    },
                    {
                        $sort: {
                            createdAt: -1
                        }
                    }
                ]
            },

        },
        {
            $project: {
                "owner.password": 0,
                "owner.watchHistory": 0,
                "owner.refreshToken": 0,
                "owner.__v": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
                "subscriptions": 0,
                "comments.owner": 0
            }
        }
    ];

    // Add isSubscribed logic only if currentUserId exists
    if (currentUserId) {
        pipeline.splice(4, 0, {
            $lookup: {
                from: 'subscriptions',
                let: { ownerId: "$owner._id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$subscribeTo", "$$ownerId"] }, // Match the video's owner
                                    { $eq: ["$subscriber", new mongoose.Types.ObjectId(currentUserId)] } // Match the current user
                                ]
                            }
                        }
                    }
                ],
                as: 'userSubscription' // This will contain the subscription if it exists
            }
        });

        pipeline.splice(5, 0, {
            $addFields: {
                isSubscribed: { $gt: [{ $size: "$userSubscription" }, 0] } // Check if the current user is subscribed
            }
        });

        pipeline.splice(6, 0, {
            $project: {
                "userSubscription": 0 // Exclude the userSubscription array
            }
        });
    }
    const video = await Video.aggregate(pipeline)
    if (!video) {
        return errorResponse(res, "video not found", 404)
    }

    return successResponse(res, "video fetched", video, 200)
})


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Parse page and limit as integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const skip = (pageNumber - 1) * limitNumber;

    const videos = await Video.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        { $unwind: "$owner" },
        {
            $project: {
                "owner.password": 0,
                "owner.watchHistory": 0,
                "owner.refreshToken": 0,
                "owner.__v": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
            }
        },
        { $skip: skip },
        { $limit: limit }
    ])

    return successResponse(res, "all video fetched", videos, 200)
})

const subscribeChannel = asyncHandler(async (req, res) => {
    const { subscribeTo } = req.body;
    const subscriber = req.user._id;

    if (!subscriber || !subscribeTo) throw errorResponse(res, "Error subscribing to channel", 400);

    const userSubscribed = new Subscription({
        subscriber, subscribeTo
    })

    await userSubscribed.save();
    return successResponse(res, "subscribed", userSubscribed, 200)
})

const unSubscribeChannel = asyncHandler(async (req, res) => {
    const { unSubscribeTo } = req.body;
    const unSubscriber = req.user._id;

    if (!unSubscribeTo || !unSubscriber) throw errorResponse(res, "Error unsubscribing", 400);

    const userUnSubscribed = await Subscription.findOneAndDelete({
        subscriber: unSubscriber,
        subscribeTo: unSubscribeTo
    })

    return successResponse(res, "unSubscribed", userUnSubscribed, 200)

})


const createHistoryAndViews = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { videoid } = req.params;

    if (!videoid) throw errorResponse(res, "Invalid videoId", 400);

    const alreadyWatched = await WatchHistory.find({ userId, videoId: videoid })
    if (!alreadyWatched.length) {

        await Video.findByIdAndUpdate(
            videoid,
            { $inc: { views: 1 } },
            { new: true }
        )

    }
    const watchHistory = new WatchHistory({
        userId,
        videoId: new mongoose.Types.ObjectId(videoid)
    })
    await watchHistory.save()


    return successResponse(res, "Video added to watch history and views increamented", {}, 200)

})

const getWatchHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const allHistory = await WatchHistory.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) }
        },
        {
            $lookup: {
                from: 'videos',
                localField: 'videoId',
                foreignField: '_id',
                as: 'videoDetails'
            }
        },
        {
            $unwind: "$videoDetails"
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'ownerDetails'
            }
        },

        {
            $unwind: "$ownerDetails"
        },

        {
            $project: {
                _id: 1,
                videoId: "$videoDetails._id",
                title: "$videoDetails.title",
                description: "$videoDetails.description",
                thumbnail: "$videoDetails.thumbnail",
                duration: "$videoDetails.duration",
                views: "$videoDetails.views",
                owner: {
                    _id: "$ownerDetails._id",
                    userName: "$ownerDetails.userName",
                    email: "$ownerDetails.email",
                    fullName: "$ownerDetails.fullName",
                    avatar: "$ownerDetails.avatar"
                },
                watchedAt: "$createdAt",
                createdAt: "$videoDetails.createdAt"
            }
        },
        {
            $sort: {
                watchedAt: -1
            }
        }
    ])
    return successResponse(res, "Watched history fetched", allHistory, 200)

})

const deleteHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { videoid } = req.params
    if (!videoid) return errorResponse(res, "Invalid videoId", 404)

    const deletedHistory = await WatchHistory.findOneAndDelete({
        userId,
        videoId: videoid
    })

    return successResponse(res, "Watch history deleted", deletedHistory, 200)

})

const likeVideo = asyncHandler(async (req, res) => {
    const { videoid } = req.params;
    const userId = req.user._id;

    if (!videoid) throw errorResponse(res, "Invalid video id.", 404, {})

    const video = await Video.findById(new mongoose.Types.ObjectId(videoid))

    if (!video) throw errorResponse(res, "Video not found.", 404, {})

    const hasLiked = video.likes.includes(userId);
    if (hasLiked) {
        video.likes = video.likes.filter(like => like.toString() !== userId.toString())
    } else {
        video.likes.push(userId)
    }

    await video.save();


    return successResponse(res, "video liked.", video, 200)
})

const clearWatchHistory = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    await WatchHistory.deleteMany({
        userId
    })

    return successResponse(res, "Watch history cleared.", {}, 200)
})

const createComment = asyncHandler(async (req, res) => {
    const { comment, videoId } = req.body;
    const userId = req.user._id;


    const commented = await Comment.create({
        comment,
        owner: userId,
        video: videoId
    })

    return successResponse(res, "comment created on video", commented, 200)

})
const deleteComment = asyncHandler(async (req, res) => {
    const { id, videoId } = req.body;
    const userId = req.user._id;


    const deletedComment = await Comment.findByIdAndDelete({
        _id: id,
        owner: userId,
        video: videoId
    })

    return successResponse(res, "comment deleted.", deletedComment, 200)

})

const searchVideo = asyncHandler(async (req, res) => {
    const { query } = req.query
    if (!query) throw errorResponse(res, "search query could not be empty.", 404, {})

    const video = await Video.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' }},
        ]
    })

    return successResponse(res, "search complete", video, 200)
})

export {
    uploadAVideo,
    getvideo,
    getAllVideos,
    subscribeChannel,
    unSubscribeChannel,
    createHistoryAndViews,
    getWatchHistory,
    deleteHistory,
    likeVideo,
    clearWatchHistory,
    createComment,
    deleteComment,
    searchVideo
}