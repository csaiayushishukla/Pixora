import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  caption: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Array, default: [] },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);
export default Post;