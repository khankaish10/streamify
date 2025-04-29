import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { errorResponse } from "./apiResponse.js";

const uploadThumbnailAndGetLocalpath = (res, thumbnailDir, videoFile) => {
    thumbnailDir = path.join(thumbnailDir, `${Date.now()}-thumbnail.png`)

    ffmpeg(videoFile.path).screenshot({
        timestamps: ["50%"], // Capture a frame at 50% of the video duration
        filename: path.basename(thumbnailPath),
        folder: thumbnailDir,
        size: "320x240", // Thumbnail size
    })
    .on("end", async () => {
        console.log("Thumbnail generated:", thumbnailDir);
        return thumbnailDir
    })
    .on("error", err => {
        return errorResponse(res, "failed to generate thumbnail", 500);
    })


    return thumbnailDir
}


export default uploadThumbnailAndGetLocalpath