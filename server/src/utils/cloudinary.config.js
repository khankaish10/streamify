import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath, folder) => {
  try {
    if (!localFilePath) return null;
    console.log("Uploading to Cloudinary:", localFilePath);
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder
    });
    console.log("Cloudinary upload result:", result);
    // Remove file from local storage after upload
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export default uploadToCloudinary;


