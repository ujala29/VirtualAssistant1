import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
 const uploadonCloudinary = async (filePath) => {
   cloudinary.config({ 
        cloud_name: process.env.Cloundary_Name, 
        api_key: process.env.Cloundary_API_Key, 
        api_secret: process.env.Cloundary_Secret_Key
    });
    try {
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath); // Delete the file after upload
        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        fs.unlinkSync(filePath); // Ensure the file is deleted even if upload fails
        // Log the error for debugging purposes
        console.error('Error uploading to Cloudinary:', error.message);
        throw new Error('Failed to upload image');
    }
}
export default uploadonCloudinary;