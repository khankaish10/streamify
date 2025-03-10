import asyncHandler from '../utils/asyncHandler.js'
import { successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'
import Video from '../model/video.model.js'

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
    // await uploadToCloudinary(req.files.video[0].path)
    return successResponse(res, "video uploaded",{}, 200 )
})



export {
    uploadAVideo,
    getvideo
}