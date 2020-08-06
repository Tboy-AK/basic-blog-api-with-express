const express = require('express');

const BlogsRouter = express.Router();

BlogsRouter
  .route('/blogs')
  .get((req, res) => {
    res.send('Read blog');
  })
  .post((req, res) => {
    res.send('Create new blog');
  })
  .put((req, res) => {
    res.send('Update blog');
  })
  .delete((req, res) => {
    res.send('Delete blog');
  });

module.exports = { BlogsRouter };
