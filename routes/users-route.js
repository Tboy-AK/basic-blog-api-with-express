const express = require('express');

const UsersRouter = express.Router();

UsersRouter
  .route('/users')
  .post((req, res) => {
    res.send('Create new user');
  });

module.exports = { UsersRouter };
