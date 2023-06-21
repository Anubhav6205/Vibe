import express from "express";

//add .js in backend
import {addAboutUser, addUser,getAboutUser,getUser} from "../controllers/ChatController.js"
import { addConversation,getConversation } from "../controllers/ConversationController.js";
import {getMessages, newMessage} from '../controllers/MessageController.js';
import { getFile, uploadFile } from "../controllers/fileController.js";
import upload from "../middleware/FileUpload.js"
const router=express.Router();

router.post('/addUser',addUser);
router.get('/getUser',getUser);
router.post('/conversation/add',addConversation);
router.post('/conversation/get',getConversation);
router.post('/message/add',newMessage);
//:id is param
router.get('/messages/get/:id',getMessages)

//files 
//upload library for file 
//expects a single file named ' file '
router.post('/file/upload',upload.single("file"),uploadFile)
router.get('/file/:filename',getFile);


//about
router.post('/aboutUser/add',addAboutUser);
router.get('/aboutUser/get',getAboutUser);
export default router;