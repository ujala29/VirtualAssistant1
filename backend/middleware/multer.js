import multer from "multer";
import  uploadonCloudinary  from "../config/cloundinary.js";

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    }, // Save the file in the public folder
    filename:  (req, file, cb)=> {
        cb(null, file.originalname);
    } // Keep the original file name
})

const upload = multer({
    storage: storage})
    // Middleware to handle file uploads
    
    export default upload;

    //Accept a file from frontend

// Save it temporarily in your public folder

// Keep the original file name

// Then you can upload it to Cloudinary, and delete the local copy