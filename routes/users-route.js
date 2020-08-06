const express = require('express');
const { userSignup } = require('../controllers/users-controller')();

const UsersRouter = express.Router();

UsersRouter
  .route('/users')
  .post(userSignup);

module.exports = { UsersRouter };
