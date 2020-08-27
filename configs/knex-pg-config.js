require('dotenv').config();
const config = require('../knexfile');
const pg = require('knex')(config[process.env.NODE_ENV]);

module.exports = { pg };
