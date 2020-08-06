const express = require('express');

const RootRouter = express.Router();

RootRouter
  .route('/')
  .get((req, res) => {
    res.send('Welcome to Tboy-AK Blog API');
  });

module.exports = { RootRouter };
