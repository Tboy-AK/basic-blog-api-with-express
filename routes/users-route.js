const express = require('express');
const errResponse = require('../utils/error-response-handler');
const UserModel = require('../models/postgres/users-model');
const { userSignup, getAllUsers } = require('../controllers/users-controller')(errResponse, UserModel);

const UsersRouter = express.Router();

UsersRouter
  .route('/users')
  .post(userSignup)
  .get(getAllUsers);

module.exports = { UsersRouter };
