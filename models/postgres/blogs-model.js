const { pg } = require('../../configs/rdbms-config');

const blogsModel = pg('blogs');

module.exports = blogsModel;
