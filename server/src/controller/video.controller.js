import asyncHandler from '../utils/asyncHandler.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'
import Video from '../model/video.model.js'
import mongoose from 'mongoose'


const uploadAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration, tags } = req.body;
    const userId = req.user._id; 

    // Validate required fields
    if (!req.files) {
        throw errorResponse(res, "Video file is required", 400);
    }
 
  
    console.log("Files:", req.files); // Logs uploaded files
    console.log("Title:", title); // Logs title
    console.log("Description:", description); // Logs description
    console.log("Tags:", tags); // Logs tags
    console.log("duration:", duration); // Logs tags

    
    // const videoUpload = await uploadToCloudinary(req.files.videoFile[0].path);
    // const thumbnailUpload = await uploadToCloudinary(req.files.thumbnail[0].path);

    // // Save video to MongoDB
    // const newVideo = await Video.create({
    //     title,
    //     videoFile: videoUpload,
    //     thumbnail: thumbnailUpload,
    //     description,
    //     duration,
    //     tags: tags ? tags.split(",") : [],
    //     owner: userId,
    // });


    // return successResponse(res, "video uploaded", newVideo, 200)
})

const getvideo = asyncHandler(async (req, res) => {
    const { videoid } = req.params;
    
    const video = await Video.aggregate([
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
    console.log("video :", video)
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


export {
    uploadAVideo,
    getvideo,
    getAllVideos
}