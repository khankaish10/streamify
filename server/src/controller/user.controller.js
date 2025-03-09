import asyncHandler from '../utils/asyncHandler.js'
import {successResponse, errorResponse} from '../utils/apiResponse.js'
import uploadToCloudinary from '../utils/cloudinary.config.js'


const signUp = asyncHandler(async(req, res) => {

    


    await uploadToCloudinary(req.files.avatar[0].path)
    return successResponse(res, "success",{}, 200)
})


const login = asyncHandler(async(req, res) => {
    return successResponse(res, "success login",{}, 200)
})


const logout = asyncHandler(async(req, res) => {
    return successResponse(res, "success logout",{}, 200)
})






export {
    signUp,
    login,
    logout
}