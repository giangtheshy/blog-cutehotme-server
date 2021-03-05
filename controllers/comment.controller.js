import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const createComment = async (req, res) => {
  const id = req.params.id;
  try {
    const data = req.body;
    const newComment = new Comment({ ...data, createdAt: new Date().getTime() });
    await newComment.save();
    const post = await Post.findById(id);
    await Post.findByIdAndUpdate(id, { comments: [...post.comments, newComment._id] });
    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Comment.find({ pid: id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
