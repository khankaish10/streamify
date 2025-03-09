import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      requied: true,
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongoosePaginate)

const Video = mongoose.model("Video", videoSchema);
export default Video;
