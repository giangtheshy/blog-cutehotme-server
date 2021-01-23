import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = mongoose.connect(process.env.CONNECTION_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;
