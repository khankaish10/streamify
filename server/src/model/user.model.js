import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String, 
      default: "/default-avatar.svg"
    },
    avatarPublicId: {
      type: String, // cloudinary/
      default: null
    },
    coverImage: {
      type: String, // cloudinary
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
      }
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.ACCESSTOKEN_SECRET, {
    expiresIn: process.env.ACCESSTOKEN_EXPIRY,
  });
  
};

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: process.env.REFRESHTOKEN_EXPIRY,
  });
  
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
