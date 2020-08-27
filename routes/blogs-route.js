const express = require('express');
const errResponse = require('../utils/error-response-handler');
const BlogModel = require('../models/blogs');
const {
  readArticle, createArticle, updateArticle, deleteArticle,
} = require('../controllers/blogs-controller')(errResponse, BlogModel);
const authenticateUser = require('../middleware/auth-middleware')(errResponse);

const BlogsRouter = express.Router();

BlogsRouter
  .use(authenticateUser);

BlogsRouter
  .route('/blogs')
  .post(createArticle)
  .get(readArticle);

BlogsRouter
  .route('/blogs/:blogId')
  .get(readArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = { BlogsRouter };
