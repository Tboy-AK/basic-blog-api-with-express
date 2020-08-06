const express = require('express');
const { apiNavigation } = require('../controllers/root-controller')();

const RootRouter = express.Router();

RootRouter
  .route('/')
  .get(apiNavigation);

module.exports = { RootRouter };
