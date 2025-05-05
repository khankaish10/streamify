import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      default: [],
      index: true, // Useful for searching videos by tags
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
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: []
    }],
    views: {
      type: Number,
      default: 0,
      index: true
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongoosePaginate)

const Video = mongoose.model("Video", videoSchema);
export default Video;
