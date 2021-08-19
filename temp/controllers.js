const {
  selectCategories,
  selectReviewById,
  updateReviewById,
  selectReviews,
  selectCommentsByReviewId,
  insertCommentByReviewId,
} = require('../models/models');
const endpoints = require('./endpoints');

exports.getEndpoints = (req, res) => {
  res.status(200).send({ endpoints });
};

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const order = req.query.order;
  const category = req.query.category;
  selectReviews(sortBy, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  selectReviewById(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  const reqBody = req.body;
  updateReviewById(reviewId, reqBody)
    .then((patchedReview) => {
      res.status(200).send({ patchedReview });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewId = (req, res, next) => {
  const reviewId = req.params.review_id;
  selectCommentsByReviewId(reviewId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentByReviewId = (req, res, next) => {
  const reviewId = req.params.review_id;
  const comment = req.body;
  insertCommentByReviewId(reviewId, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
