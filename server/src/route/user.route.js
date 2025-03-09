import { Router } from "express";
import { login, signUp, logout } from "../controller/user.controller.js";
import upload from "../middleware/multer.middleware.js";
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
router.route("/logout").post(logout);

export default router;
