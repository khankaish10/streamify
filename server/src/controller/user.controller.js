import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import uploadToCloudinary from "../utils/cloudinary.config.js";
import User from "../model/user.model.js";
import Subscription from "../model/subscription.model.js";
import mongoose from "mongoose";
import fs from "fs";
import jwt from "jsonwebtoken";

const signUp = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;
  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw errorResponse(res, "All fields are required", 404);
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) throw errorResponse(res, "User already exist");

  const avatarLocalPath = req.files.avatar[0].path;
  if (!avatarLocalPath)
    throw errorResponse(res, "Avatar file is required", 404);

  // upload avatar to cloudinary
  const avatarUploadResult = await uploadToCloudinary(avatarLocalPath);
  if (!avatarUploadResult) {
    fs.unlinkSync(avatarLocalPath);
    throw errorResponse(res, "Failed to upload avatar");
  }

  //upload cover Image if available
  let coverImageUrl = "";
  if (req.files.coverImage[0]?.path) {
    const coverImageUploadResult = await uploadToCloudinary(
      req.files.coverImage[0].path
    );
    coverImageUrl = coverImageUploadResult;
  }
  // create user in db
  const newUser = new User({
    userName,
    email,
    fullName,
    password,
    avatar: avatarUploadResult,
    coverImage: coverImageUrl,
  });
  const refreshToken = await newUser.generateRefreshToken();
  newUser.refreshToken = refreshToken;
  await newUser.save();

  const accessToken = await newUser.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  return successResponse(
    res,
    "success",
    {
      accessToken,
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      fullName: newUser.fullName,
      avatar: newUser.avatarUploadResult,
      coverImage: newUser.coverImageUrl,
      createdAt: newUser.createdAt,
    },
    200
  );
});

const login = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (userName == "" || email == "") {
    throw errorResponse(res, "userName or email must be entered", 400);
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  console.log(existedUser);
  if (!existedUser) {
    throw errorResponse(res, "User doesnot exist", 400);
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) throw errorResponse(res, "Incorrect credentials");

  const accessToken = await existedUser.generateAccessToken();
  const refreshToken = await existedUser.generateRefreshToken();

  existedUser.refreshToken = refreshToken;
  await existedUser.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  return successResponse(
    res,
    "success",
    {
      accessToken,
      _id: existedUser._id,
      userName: existedUser.userName,
      email: existedUser.email,
      fullName: existedUser.fullName,
      avatar: existedUser.avatar,
      coverImage: existedUser.coverImage,
      createdAt: existedUser.createdAt,
    },
    200
  );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  res
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .clearCookie("refreshToken", { httpOnly: true, secure: true });

  return successResponse(res, "success logout", {}, 200);
});

const generateRefreshAccessToken = async (req, res) => {
  const refreshToken = req.cookie("refreshToken"); // gpt suggested to req.cookies.refreshToken instead, will check later
  if (!refreshToken) throw errorResponse(res, "Invalid refresh token");

  const decodedRefreshToken = await jwt.verify(
    refreshToken,
    process.env.REFRESHTOKEN_SECRET
  );
  if (!decodedRefreshToken) throw errorResponse(res, "Invalid refresh Token");

  const user = await User.findById(decodedRefreshToken.id).select("-password");
  if (!user) throw errorResponse(res, "User doesn't exist or expired token");

  const accessToken = await user.generateAccessToken();

  res.cookie("accessToken", accessToken, options);

  return successResponse(
    res,
    "success",
    {
      accessToken,
    },
    200
  );
};

const getMyProfile = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).select("-password -refreshToken");
  if (!user) {
    return errorResponse(res, "User not found", 404);
  }
  return successResponse(res, "logged in user", user, 200);
};

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const userDetails = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscribeTo",
        as: "subscriber",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscriberCount: { $size: "$subscriber" },
        subscribedToCount: { $size: "$subscribedTo" },
        isSubscribed: {
          $cond: {
            if: {
              $in: [
                req.user._id,
                {
                  $map: { input: "$subscriber", as: "s", in: "$$s.subscriber" },
                },
              ],
            },
            then: true,
            else: false,
          },
        },
        // isSubscribed: {
        //   $gt: [
        //     {
        //       $size: {
        //         $filter: {
        //           input: "$subscriber",
        //           as: "sub",
        //           cond: { $eq: ["$$sub.subscriber", req.user._id] },
        //         },
        //       },
        //     },
        //     0,
        //   ],
        // },
      },
    },
    {
      $project: {
        password: 0,
        refreshToken: 0,
        watchHistory: 0,
        subscribedTo: 0,
      },
    },
  ]);

  if (!userDetails) {
    return errorResponse(res, "User not found", 404);
  }

  return successResponse(res, "user profile", userDetails, 200);
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const updateMyProfile = JSON.parse(JSON.stringify(req.body));
  const id = req.user._id;

  if (!updateMyProfile) throw errorResponse(res, "No updates provided", 400);

  if (updateMyProfile.password) {
    return errorResponse(res, "Cannot update password through this route", 400);
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateMyProfile },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  if (!user) throw errorResponse(res, "user not found", 404);

  return successResponse(res, "successfully updated user profile", user, 200);
});

const subscribeUser = asyncHandler(async (req, res) => {
  const subscriber = req.user._id;
  const subscribeTo = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(subscribeTo)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  if (subscriber === subscribeTo) {
    return res.status(400).json({ error: "You cannot subscribe to yourself" });
  }
  //check if already subscribed to the user
  const existingSubscription = await Subscription.findOne({
    subscriber,
    subscribeTo,
  });
  if (existingSubscription)
    throw errorResponse(res, "You are already subscribed to the user");

  const newSubscription = new Subscription({
    subscriber,
    subscribeTo,
  });
  await newSubscription.save();

  return successResponse(res, "User subscribed", newSubscription, 200);
});

const getMySubscriber = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const subscription = await Subscription.aggregate([
    { $match: { subscribeTo: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscribedUsers",
      },
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscribedUsers",
        },
      },
    },
    {
      $unwind: "$subscribedUsers", // Flatten the subscribedUsers array
    },
    {
      $group: {
        _id: "$subscribeTo",
        subscriber: {
          $push: {
            _id: "$subscribedUsers._id",
            userName: "$subscribedUsers.userName",
            email: "$subscribedUsers.email",
            fullName: "$subscribedUsers.fullName",
            avatar: "$subscribedUsers.avatar",
            coverImage: "$subscribedUsers.coverImage",
            createdAt: "$subscribedUsers.createdAt",
          },
        },
        subscriberCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        subscriberCount: 1,
        subscriber: 1,
      },
    },
  ]);

  console.log("subs: ", subscription);

  return successResponse(
    res,
    "subscriber fetched successfully",
    subscription,
    200
  );
});

export {
  signUp,
  login,
  logout,
  generateRefreshAccessToken,
  getMyProfile,
  getUserProfile,
  updateMyProfile,
  getMySubscriber,
  subscribeUser,
};
