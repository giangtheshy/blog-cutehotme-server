import express from "express";
import {
  registerUser,
  loginUser,
  isValidToken,
  deleteUser,
  getUser,
  loginGoogleUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/api/users/register", registerUser);
route.post("/api/users/login", loginUser);
route.post("/api/users/isValidToken", isValidToken);
route.delete("/api/users/:id", deleteUser);
route.get("/api/users", auth, getUser);
route.post("/api/users/loginGoogle", loginGoogleUser);

export default route;
