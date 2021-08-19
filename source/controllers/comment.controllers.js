const {
  deleteCommentById,
  updateCommentById,
} = require('../models/comment.models');

exports.deleteCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;

  deleteCommentById(commentId)
    .then((deletedComment) => {
      res.status(200).send({ deletedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;
  const reqBody = req.body;
  updateCommentById(commentId, reqBody)
    .then((patchedComment) => {
      res.status(200).send({ patchedComment });
    })
    .catch((err) => {
      next(err);
    });
};
