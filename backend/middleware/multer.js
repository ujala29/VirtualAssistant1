import multer from "multer";
import  uploadonCloudinary  from "../config/cloundinary.js";

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename:  (req, file, cb)=> {
        cb(null, file.originalname);
    }
})

const upload = multer({
    storage: storage})  
    export default upload;