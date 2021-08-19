const express = require('express');
const { getCategories } = require('../source/controllers/category.controllers');

const catagoriesRouter = express.Router();

catagoriesRouter.get('/', getCategories);

module.exports = catagoriesRouter;
