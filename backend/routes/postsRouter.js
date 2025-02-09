import express from 'express';
import postsController from '../controllers/postsController.js';

export const postsRouter = express.Router();

postsRouter.post('/', postsController.createPost);
postsRouter.get('/', postsController.getPosts);
postsRouter.delete('/:postId', postsController.deletePost);
postsRouter.patch('/:postId/like', postsController.likePost);
postsRouter.patch('/:postId/dislike', postsController.dislikePost);