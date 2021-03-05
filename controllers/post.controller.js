import mongoose from "mongoose";
import PostsDB from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, creator, selectedFile, tags, message, photoURL, userID } = req.body;
  const newPost = new PostsDB({
    title,
    creator,
    selectedFile,
    photoURL,
    userID,
    tags,
    message,
    createdAt: new Date().getTime(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const posts = await PostsDB.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsDB.findById(id);
    if (!post) return res.status(404).json({ error: "id not matching post" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).json({ message: "Not found post by id" });
    await PostsDB.findByIdAndRemove(id);
    res.json({ message: "Delete success" });
  } catch (error) {
    console.log(error.message);
  }
};
export const likePost = async (req, res) => {
  try {
    const { id, uid } = req.query;
    if (!uid) return res.status(400).json({ message: "not found user account" });
    const post = await PostsDB.findById(id);
    let newPost;
    if (post.likeCount.find((like) => like === uid)) {
      newPost = await PostsDB.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount.filter((like) => like !== uid) },
        { new: true }
      );
    } else {
      newPost = await PostsDB.findByIdAndUpdate(id, { likeCount: [...post.likeCount, uid] }, { new: true });
    }
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = req.body;
    const newPost = await PostsDB.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
