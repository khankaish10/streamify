import { uploadToCloudinaryApi } from "@/api/videoApi";

const uploadToCloudinary = async (
    file: any, 
    folder: string, 
    resourceType: string, 
    signatureData: any
) => {
    console.log("sign: ", signatureData)
    const formData = new FormData()
    formData.append("file", file);
    formData.append("folder", folder);
    formData.append("api_key", signatureData?.apiKey );
    formData.append("timestamp", signatureData?.timestamp);
    formData.append("signature", signatureData?.signature);


    const url = `https://api.cloudinary.com/v1_1/${signatureData?.cloudName}/${resourceType}/upload`
    const res = await fetch(url, {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log("dta: " , data)
    return data.secure_url

}

export default uploadToCloudinary