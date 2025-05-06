import mongoose,{ Schema } from 'mongoose'


const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }

}, { timestamps: true })


const Comment = mongoose.model("Comment", commentSchema)
export default Comment;