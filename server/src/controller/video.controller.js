import asyncHandler from '../utils/asyncHandler.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'
import Video from '../model/video.model.js'
import mongoose from 'mongoose'

const uploadAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration, tags } = req.body;
    const userId = req.user._id; // Extracted from auth middleware

    // Validate required fields
    if (!req.files?.videoFile || !req.files?.thumbnail) {
        throw errorResponse(res, "Video file and thumbnail are required", 400);
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

    
    return successResponse(res, "video uploaded", newVideo, 200 )
})

const getvideo = asyncHandler(async (req, res) => {
    const {videoid} = req.params;
    console.log(videoid)
    const video = await Video.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId('67ce1520624559d1352a9bfd') }
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
            $project: {
                "owner.password": 0,
                "owner.watchHistory": 0,
                "owner.refreshToken": 0,
                "owner.__v": 0,
                "owner.createdAt": 0,
                "owner.updatedAt": 0,
            }
        }

    ])

    if(!video) {
        return errorResponse(res, "video not found", 404)
    }

    return successResponse(res, "video fetched", video, 200 )
})



export {
    uploadAVideo,
    getvideo
}