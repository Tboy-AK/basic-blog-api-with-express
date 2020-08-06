const express = require('express');
const {
  readArticle, createArticle, updateArticle, deleteArticle,
} = require('../controllers/blogs-controller')();

const BlogsRouter = express.Router();

BlogsRouter
  .route('/blogs')
  .get(readArticle)
  .post(createArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = { BlogsRouter };
