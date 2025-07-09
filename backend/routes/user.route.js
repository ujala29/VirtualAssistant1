import express from 'express';
import {asktoAssistant, getUser, updateAssistant} from '../controller/user.controller.js';
import {isAuth} from '../middleware/isauth.js';
import upload from "../middleware/multer.js"

const UserRouter = express.Router();
UserRouter.get('/current',isAuth, getUser);
UserRouter.post('/update',isAuth,upload.single("assistantimage"), updateAssistant);
UserRouter.post('/asktoassistant',isAuth, asktoAssistant);

export default UserRouter;