import { Router } from "express";
import {uploadAVideo, getvideo} from '../controller/video.controller.js'
import upload from "../middleware/multer.middleware.js";
const router = Router();


router.route("/upload-video").post(upload.single("video"), uploadAVideo)


export default router;
