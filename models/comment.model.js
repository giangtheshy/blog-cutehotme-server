import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  uid: String,
  displayName: String,
  photoURL: String,
  message: String,
  pid: String,
  createdAt: { type: Number, default: new Date().getTime() },
});
export default mongoose.model("comments", commentSchema);
