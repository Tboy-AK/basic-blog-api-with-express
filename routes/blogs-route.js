const express = require('express');
const errResponse = require('../utils/error-response-handler');
const BlogModel = require('../models/blogs-model');
const {
  readArticle, createArticle, updateArticle, deleteArticle,
} = require('../controllers/blogs-controller')(errResponse, BlogModel);

const BlogsRouter = express.Router();

BlogsRouter
  .route('/blogs')
  .get(readArticle)
  .post(createArticle);

BlogsRouter
  .route('/blogs/:blogId')
  .get(readArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = { BlogsRouter };
