import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  users: {
    type: [{ _id: String }],
    default: [],
  },
  messages: {
    type: [{ uid: String, message: String, displayName: String }],
    default: [],
  },
  counter: { type: Number, default: 0 },
});
export default mongoose.model("rooms", roomSchema);
