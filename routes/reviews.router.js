const express = require('express');
const {
  getReviews,
  getReviewById,
  patchReviewById,
  postCommentByReviewId,
  getCommentsByReviewId,
} = require('../source/controllers/review.controllers');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getReviews);

reviewsRouter.route('/:review_id').get(getReviewById).patch(patchReviewById);

reviewsRouter
  .route('/:review_id/comments')
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);

module.exports = reviewsRouter;
