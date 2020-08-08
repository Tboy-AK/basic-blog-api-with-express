const express = require('express');
const errResponse = require('../utils/error-response-handler');
const UserModel = require('../models/users-model');
const { userSignin } = require('../controllers/auths-controller')(errResponse, UserModel);

const AuthsRouter = express.Router();

AuthsRouter
  .route('/auths')
  .post(userSignin);

module.exports = { AuthsRouter };
