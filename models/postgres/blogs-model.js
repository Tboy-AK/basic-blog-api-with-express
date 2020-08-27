const { pg } = require('../../configs/knex-pg-config');

const blogsModel = pg('blogs');

module.exports = blogsModel;
