const express = require('express');
const errResponse = require('../utils/error-response-handler');
const UserModel = require('../models/auths');
const { userSignin, changeUserPassword } = require('../controllers/auths-controller')(errResponse, UserModel);

const AuthsRouter = express.Router();

AuthsRouter
  .route('/auths')
  .post(userSignin)
  .put(changeUserPassword);

module.exports = { AuthsRouter };
