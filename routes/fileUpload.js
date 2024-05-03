import express from "express";
import { localFileUpload ,imageUpload,videoUpload, imageSizeReducer} from "../controllers/fileUpload.js";

const router=express.Router();
router.post("/localfileupload",localFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagesizereducer",imageSizeReducer);



export default router;