const express = require('express');
const { getEndpoints } = require('../source/controllers/api.controllers');
const reviewsRouter = require('./reviews.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const commentsRouter = require('./comments.router');

const apiRouter = express.Router();

apiRouter.get('/', getEndpoints);

apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
