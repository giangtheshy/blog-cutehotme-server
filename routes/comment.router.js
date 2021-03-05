import express from "express";
import { createComment, getComments } from "../controllers/comment.controller.js";

const route = express.Router();

route.post("/api/comments/:id", createComment);
route.get("/api/comments/:id", getComments);
export default route;
