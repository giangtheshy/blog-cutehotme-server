import express from "express";
import { createPost, getPost, deletePost, likePost, updatePost } from "../controllers/post.controller.js";

const route = express.Router();

route.post("/api/posts", createPost);
route.get("/api/posts", getPost);
route.delete("/api/posts/:id", deletePost);
route.patch("/api/posts/like", likePost);
route.patch("/api/posts/:id", updatePost);

export default route;
