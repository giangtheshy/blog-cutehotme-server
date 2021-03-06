import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  displayName: String,
  id: { type: String, default: 0 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  photoURL: { type: String, default: "https://png.pngitem.com/pimgs/s/130-1300400_user-hd-png-download.png" },
  role: { type: String, default: "normal" },
});

export default mongoose.model("user", userSchema);
