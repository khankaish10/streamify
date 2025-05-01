import { Router } from "express";
import { 
  uploadAVideo, getvideo, getAllVideos, 
  subscribeChannel, unSubscribeChannel, 
  createHistory, getWatchHistory, deleteHistory 
} from "../controller/video.controller.js";
import upload from "../middleware/multer.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = Router();

router.route("/upload-video").post(
  verifyJwt,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  uploadAVideo
);

router.route("/watch/:videoid").post(getvideo);
router.route("/").get(getAllVideos)
router.route("/subscribe").post(verifyJwt, subscribeChannel)
router.route("/unsubscribe").post(verifyJwt, unSubscribeChannel)
router.route("/history/:videoid").post(verifyJwt, createHistory)
router.route("/history/:videoid").delete(verifyJwt, deleteHistory)
router.route("/history").get(verifyJwt, getWatchHistory)

export default router;
