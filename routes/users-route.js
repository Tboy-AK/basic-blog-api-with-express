const express = require('express');
const errResponse = require('../utils/error-response-handler');
const UserModel = require('../models/users-model');
const { userSignup } = require('../controllers/users-controller')(errResponse, UserModel);

const UsersRouter = express.Router();

UsersRouter
  .route('/users')
  .post(userSignup);

module.exports = { UsersRouter };
