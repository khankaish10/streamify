import { Router } from "express";
import { 
  uploadAVideo, getvideo, getAllVideos, 
  subscribeChannel, unSubscribeChannel, 
  createHistoryAndViews, getWatchHistory, deleteHistory, 
  likeVideo, clearWatchHistory,
  createComment
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
router.route("/like/:videoid").post(verifyJwt,likeVideo)
router.route("/unsubscribe").post(verifyJwt, unSubscribeChannel)
router.route("/history/:videoid").post(verifyJwt, createHistoryAndViews)
router.route("/history/:videoid").delete(verifyJwt, deleteHistory)
router.route("/history").get(verifyJwt, getWatchHistory)
router.route("/history").delete(verifyJwt, clearWatchHistory)
router.route("/comment").post(verifyJwt, createComment)


export default router;
