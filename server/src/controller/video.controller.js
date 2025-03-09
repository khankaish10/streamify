import asyncHandler from '../utils/asyncHandler.js'
import { successResponse } from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'

const uploadAVideo = asyncHandler(async (req, res) => {
    await uploadToCloudinary(req.file.path)
    return successResponse(res, "video uploaded",{}, 200 )
})

const getvideo = asyncHandler(async (req, res) => {
    // await uploadToCloudinary(req.files.video[0].path)
    console.log(req.file)
    return successResponse(res, "video uploaded",{}, 200 )
})



export {
    uploadAVideo,
    getvideo
}