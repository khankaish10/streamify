import { Router } from "express";
import { uploadAVideo, getvideo, getAllVideos } from "../controller/video.controller.js";
import upload from "../middleware/multer.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = Router();

router.route("/upload-video").post(
  verifyJwt,
  upload.single("videoFile"),
  // upload.fields([
  //   {
  //     name: "videoFile",
  //     maxCount: 1,
  //   },
  //   {
  //     name: "thumbnail",
  //     maxCount: 1,
  //   },
  // ]),
  uploadAVideo
);

router.route("/watch/:videoid").get(getvideo);
router.route("/").get(getAllVideos)

export default router;
