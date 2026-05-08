import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // nodejs file system module

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null; // No file path provided
        //upload image to cloudinary
        const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto", // auto-detect the file type (image, video, etc.)
        })
        //file has been uploaded successfully
        console.log("File uploaded successfully to Cloudinary",response.url);
        return response; // Return the URL of the uploaded file using response.url
    } catch (error) {
        fs.unlinkSync(localFilePath); // Delete the locally saved temporary file if upload fails
        return null
        
    } 

}

export {uploadOnCloudinary};