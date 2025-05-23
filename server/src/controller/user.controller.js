import asyncHandler from "../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import uploadToCloudinary from "../utils/cloudinary.config.js";
import User from "../model/user.model.js";
import Subscription from "../model/subscription.model.js";
import WatchHistory from "../model/watchHistory.model.js";
import mongoose from "mongoose";
import fs from "fs";
import jwt from "jsonwebtoken";
import cloudinary from 'cloudinary'

const signUp = asyncHandler(async (req, res) => {
  const { userName, email, password, fullName } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field?.trim() === "")
  ) {
    throw errorResponse(res, "All fields are required", 404, {
      email: "Email is required.",
      fullName: "Fullname is required.",
      password: "Password is required.",
      userName: "Username is required.",
    });
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });


  if (existedUser) throw errorResponse(res, "User already exist", 404, {
    email: "Email/Username already exists.",
    userName: "Email/Username already exists",
  });
  let avatarLocalPath = "";
  if ((req?.files && req?.files?.avatar && req?.files?.avatar?.[0]?.path)) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }
  // throw errorResponse(res, "Avatar file is required", 404, {
  //   avatar: "Profile pic is required."}

  // upload avatar to cloudinary
  const avatarUploadResult = await uploadToCloudinary(avatarLocalPath, 'avatar');
  // if (!avatarUploadResult?.secure_url) {
  //   fs.unlinkSync(avatarLocalPath);
  //   throw errorResponse(res, "Failed to upload avatar", 500, {
  //     avatar: "Failed to upload profile picture."
  //   });
  // }

  //upload cover Image if available
  let coverImageUrl = "";
  if (req.files?.coverImage && req.files?.coverImage[0]?.path) {
    const coverImageUploadResult = await uploadToCloudinary(
      req.files.coverImage[0].path,
      'coverimage'
    );
    coverImageUrl = coverImageUploadResult?.secure_url;
  }
  // create user in db
  const newUser = new User({
    userName,
    email,
    fullName,
    password,
    avatar: avatarUploadResult?.secure_url,
    coverImage: coverImageUrl,
  });
  const refreshToken = await newUser.generateRefreshToken();
  newUser.refreshToken = refreshToken;
  await newUser.save();

  const accessToken = await newUser.generateAccessToken();

  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   path: "/"
  // };

  // res
  //   .cookie("accessToken", accessToken, options)
  //   .cookie("refreshToken", refreshToken, options);

  return successResponse(
    res,
    "success",
    {
      refreshToken,
      accessToken,
      refreshToken,
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      fullName: newUser.fullName,
      avatar: newUser.avatar,
      coverImage: newUser.coverImage,
      createdAt: newUser.createdAt,
    },
    200
  );
});

const login = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;

  if (userName == "" || email == "") {
    throw errorResponse(res, "userName or email must be entered", 400, {
      email: "userName or email must be entered",
    });
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!existedUser) {
    throw errorResponse(res, "User doesnot exist", 400, {
      email: "User doesnot exist."
    });
  }

  const isPasswordValid = await existedUser.isPasswordCorrect(password);
  if (!isPasswordValid) throw errorResponse(res, "Incorrect credentials", 404, {
    email: "Incorrect credentials"
  });

  const accessToken = await existedUser.generateAccessToken();
  const refreshToken = await existedUser.generateRefreshToken();

  existedUser.refreshToken = refreshToken;
  await existedUser.save({ validateBeforeSave: false });
  // const options = {
  //   httpOnly: true,
  //   secure: true,
  //   // secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   path: "/"
  // };
  // res
  //   .cookie("accessToken", accessToken, options)
  //   .cookie("refreshToken", refreshToken, options);

  return successResponse(
    res,
    "success",
    {
      refreshToken,
      accessToken,
      refreshToken,
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
  console.log("logout called");
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });
  // const options = {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //   path: "/"
  // };

  // res
  //   .clearCookie("accessToken", options)
  //   .clearCookie("refreshToken", options);

  return successResponse(res, "success logout", {}, 200);
});

const generateRefreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body
  console.log("refresh token recieved: ", refreshToken)
  if (!refreshToken) throw errorResponse(res, "Invalid refresh token");

  const decodedRefreshToken = await jwt.verify(
    refreshToken,
    process.env.REFRESHTOKEN_SECRET
  );

  if (!decodedRefreshToken) throw errorResponse(res, "Invalid refresh Token");

  const user = await User.findById(decodedRefreshToken.id).select("-password");
  if (!user) throw errorResponse(res, "User doesn't exist or expired token");

  const newAccessToken = await user.generateAccessToken();
  const newRefreshToken = await user.generateRefreshToken()

  user.accessToken = newAccessToken;
  user.refreshToken = newRefreshToken;
  await user.save();

  return successResponse(
    res,
    "success",
    {
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
      _id: user._id,
      userName: user.userName,
      email: user.email,
      fullName: user.fullName,
      avatar: user.avatar,
      coverImage: user.coverImage,
      createdAt: user.createdAt,
    },
    200
  );
};

const getMyProfile = async (req, res) => {
  const id = req.user._id;

  const user = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "allvideos"
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscribeTo",
        as: "subscription",
      }
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscription"
        }
      }
    },
    {
      $project: {
        password: 0,
        watchHistory: 0,
        refreshToken: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        subscription: 0
      }
    }
  ])

  if (!user) {
    return errorResponse(res, "User not found", 404);
  }
  return successResponse(res, "User profile", user, 200);
};

const getUserProfile = asyncHandler(async (req, res) => {
  const { channelid } = req.params;

  const userDetails = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(channelid) } },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "allvideos"
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscribeTo",
        as: "subscription",
      }
    },
    {
      $addFields: {
        subscriberCount: {
          $size: "$subscription"
        }
      }
    },
    {
      $project: {
        password: 0,
        watchHistory: 0,
        refreshToken: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        subscription: 0
      }
    }
  ])
  // console.log("getUserProfile -- id: ", id);
  // if(!id) throw errorResponse(res, "Invalid user Id", 404)
  // const userDetails = await User.aggregate([
  //   { $match: { _id: new mongoose.Types.ObjectId(id) } },
  //   {
  //     $lookup: {
  //       from: "subscriptions",
  //       localField: "_id",
  //       foreignField: "subscribeTo",
  //       as: "subscriber",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "subscriptions",
  //       localField: "_id",
  //       foreignField: "subscriber",
  //       as: "subscribedTo",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       subscriberCount: { $size: "$subscriber" },
  //       subscribedToCount: { $size: "$subscribedTo" },
  //       isSubscribed: {
  //         $cond: {
  //           if: {
  //             $in: [
  //               req.user._id,
  //               {
  //                 $map: { input: "$subscriber", as: "s", in: "$$s.subscriber" },
  //               },
  //             ],
  //           },
  //           then: true,
  //           else: false,
  //         },
  //       },
  //       // isSubscribed: {
  //       //   $gt: [
  //       //     {
  //       //       $size: {
  //       //         $filter: {
  //       //           input: "$subscriber",
  //       //           as: "sub",
  //       //           cond: { $eq: ["$$sub.subscriber", req.user._id] },
  //       //         },
  //       //       },
  //       //     },
  //       //     0,
  //       //   ],
  //       // },
  //     },
  //   },
  //   {
  //     $project: {
  //       password: 0,
  //       refreshToken: 0,
  //       watchHistory: 0,
  //       subscribedTo: 0,
  //     },
  //   },
  // ]);

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
    return errorResponse(res, "Cannot update password through this route", 400, {});
  }

  if (req?.file && req?.file?.path) {
    // delete previously stored avatar
    const user = await User.findById(id)
    if (user.avatarPublicId) {
      await cloudinary.uploader.destroy(user.avatarPublicId)
    }

    // upload new avatar
    const avatarLocalPath = req.file.path;
    const avatarUploadResult = await uploadToCloudinary(avatarLocalPath, 'avatar')
    if (avatarUploadResult) {
      updateMyProfile.avatar = avatarUploadResult?.secure_url;
      updateMyProfile.avatarPublicId = avatarUploadResult?.public_id
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateMyProfile },
    { new: true, runValidators: true }
  ).select("-password -refreshToken -avatarPublicId");

  if (!updatedUser) throw errorResponse(res, "user not found", 404);
  return successResponse(res, "successfully updated user profile", updatedUser, 200);
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

const addToWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const videoId = req.params.videoId;

  if (!videoId) {
    return errorResponse(res, "video Id is required", 404);
  }

  const existingEntry = await WatchHistory.findOne({ userId, videoId });
  if (existingEntry) {
    existingEntry.createdAt = new Date();
    await existingEntry.save();
    return successResponse(res, "watch history updated", {}, 200);
  }

  const history = new WatchHistory({
    userId,
    videoId,
  });

  await history.save();

  return successResponse(res, "video updated to watch history", history, 200);
});

const getMyWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
});
const deleteWatchHistory = asyncHandler(async (req, res) => { });

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
  // getMyWatchHistory,
  addToWatchHistory,
  // deleteWatchHistory,
};
