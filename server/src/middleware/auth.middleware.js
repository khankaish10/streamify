import User from "../model/user.model.js";
import {errorResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");


    if (!token) throw errorResponse(res, "Unauthorized access!", 401);
    console.log("token: ", token)
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESSTOKEN_SECRET
    );

    console.log("decoded token : ", decodedToken)
    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return next(errorResponse(res, "User not found!", 404)); // Pass error to error-handling middleware
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(errorResponse(res, "JWT expired. Please log in again.", 401));
    }
    next(error); // Pass any unexpected errors to error-handling middleware
  }
};

export default verifyJwt;
