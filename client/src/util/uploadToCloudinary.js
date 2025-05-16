import axios from 'axios'
import { AxiosRequestConfig } from 'axios'

// interface CloudinaryResponse {
//     secure_url: string;
// }

// interface signatureType {
//     timestamp: number,
//     signature: string,
//     cloudName: string,
//     apiKey: string
// }


const uploadToCloudinary = async (
    file,
    folder,
    resourceType,
    signatureData,
    onProgress,
)=> {
    console.log("sign: ", signatureData)
    const formData = new FormData()
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("api_key", signatureData?.apiKey);
    formData.append("timestamp", signatureData?.timestamp.toString());
    formData.append("signature", signatureData?.signature);


    const url = `https://api.cloudinary.com/v1_1/${signatureData?.cloudName}/${resourceType}/upload`
    const config = {
        onUploadProgress: function (event) {
            const percent = Math.round((event.loaded * 100) / (event.total || 1))
            onProgress(percent);
        }
    }
    const res = await axios.post<CloudinaryResponse>(url, formData, config)
    return res.data.secure_url
}

export default uploadToCloudinary