import { Router } from "express";
import {
  login,
  signUp,
  logout,
  getMyProfile,
  getUserProfile,
  updateMyProfile,

  subscribeUser,
  getMySubscriber,
  getMyWatchHistory,
  addToWatchHistory,
  deleteWatchHistory
} from "../controller/user.controller.js";
import upload from "../middleware/multer.middleware.js";
import verifyJwt from "../middleware/auth.middleware.js";
const router = Router();

router.route("/signup").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  signUp
);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);
router.route("/profile").get(verifyJwt, getMyProfile);
router.route("/update-profile").patch(verifyJwt, updateMyProfile);
router.route("/subscription").get(verifyJwt, getMySubscriber)
router.route("/subscription/subscribe/:id").post(verifyJwt, subscribeUser);
router.route("/history").get(verifyJwt, getMyWatchHistory)
router.route("/history").post(verifyJwt, deleteWatchHistory)
router.route("/history/:videoId").post(verifyJwt, addToWatchHistory)


router.route("/:id").get(verifyJwt, getUserProfile);
export default router;
