import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  photoURL: String,
  userID: String,
  likeCount: { type: [String], default: [] },
  createdAt: { type: Number, default: new Date().getTime() },
});
export default mongoose.model("posts", postSchema);
