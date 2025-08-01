import express from 'express';
import {asktoAssistant, getUser, updateAssistant} from '../controller/user.controller.js';
import {isAuth} from '../middleware/isauth.js';
import upload from "../middleware/multer.js"

const UserRouter = express.Router();
UserRouter.get('/current',isAuth, getUser);
UserRouter.post('/update',isAuth,upload.single("assistantimage"), updateAssistant);

// upload.single("assistantimage") uses Multer to accept one image file.

// That file should be coming from a form field with the name "assistantimage".
//Inside updateAssistant, you'll likely:

// Access the uploaded image via req.file

// Upload it to Cloudinary

// Update the assistant's data in the database (e.g., image URL, name,
UserRouter.post('/asktoassistant',isAuth, asktoAssistant);

export default UserRouter;