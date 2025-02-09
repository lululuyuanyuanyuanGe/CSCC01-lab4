import { Post } from "../models/post.js";
import { User } from "../models/user.js";

export default {
  async createPost(req, res) {
    try {
      const {content} = req.body;
      // TODO: Implement post creation
      if (!req.session.userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      if (!content || content.trim() === "") {
        return res.status(400).json({ error: "Post content cannot be empty" });
      }

      const newPost = await Post.create({
        content,
        authorId: req.session.userId,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0
      });

      res.status(201).json(newPost);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred during post creation.'
      });
    }
  },

  async getPosts(req, res) {
    try {
      // Get all posts
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'username']
        }
      });
      const result = posts.map(post => {
        return {
          id: post.id,
          content: post.content,
          likes: post.likes,
          dislikes: post.dislikes,
          author: {
            id: post.user.id,
            username: post.user.username
          }
        }
      });
      res.status(200).json(result);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred during post retrieval.'
      });
    }
  },

  async likePost(req, res) {
    try {
      const {postId} = req.params;
      // Check if the user is logged in
      if (!req.session.userId) {
        return res.status(401).json({
          error: 'You need to log in to like a post.'
        });
      }
      // Find the post
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({
          error: 'The post was not found.'
        });
      }
      // Like the post
      post.likes++;
      await post.save();
      res.json({
        message: 'The post has been liked.'
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred during liking post.'
      });
    }
  },

  async dislikePost(req, res) {
    try {
      const {postId} = req.params;
      // Check if the user is logged in
      if (!req.session.userId) {
        return res.status(401).json({
          error: 'You need to log in to dislike a post.'
        });
      }
      // Find the post
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({
          error: 'The post was not found.'
        });
      }
      // Dislike the post
      post.dislikes++;
      await post.save();
      res.json({
        message: 'The post has been disliked.'
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred during disliking post.'
      });
    }
  },

  async deletePost(req, res) {
    try {
      const {postId} = req.params;
      // Check if the user is logged in
      if (!req.session.userId) {
        return res.status(401).json({
          error: 'You need to log in to delete a post.'
        });
      }
      // Find the post
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({
          error: 'The post was not found.'
        });
      }
      // Check if the user is the author of the post
      if (post.userId !== req.session.userId) {
        return res.status(403).json({
          error: 'You can only delete your own posts.'
        });
      }
      // Delete the post
      await post.destroy();
      res.status(200).json({
        message: 'The post has been deleted.'
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred during deleting post.'
      });
    }
  }
}