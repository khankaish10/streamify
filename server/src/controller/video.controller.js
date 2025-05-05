import asyncHandler from '../utils/asyncHandler.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'
import Video from '../model/video.model.js'
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
            }
        },
        {
            $addFields: {
                subscriberCount: { $size: "$subscriptions" } // Count total subscribers
            }
        },
        {
            $project: {
                "owner.password": 0,
                "owner.watchHistory": 0,
                "owner.refreshToken": 0,
                "owner.__v": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
                "subscriptions": 0 // Exclude the subscriptions array
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


export {
    uploadAVideo,
    getvideo,
    getAllVideos,
    subscribeChannel,
    unSubscribeChannel,
    createHistoryAndViews,
    getWatchHistory,
    deleteHistory
}