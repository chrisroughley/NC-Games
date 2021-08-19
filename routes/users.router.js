const express = require('express');
const {
  getUsers,
  getUserByUsername,
} = require('../source/controllers/user.controllers');

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getUserByUsername);

module.exports = usersRouter;
