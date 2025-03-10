import User from "../model/user.model.js";
import {errorResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw errorResponse(res, "Unauthorized access!", 401);

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESSTOKEN_SECRET
    );

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    throw errorResponse(res, "Unauthorized access!", 404);
  }
};

export default verifyJwt;
