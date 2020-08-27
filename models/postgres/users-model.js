const { pg } = require('../../configs/knex-pg-config');

const usersModel = pg('auths');

module.exports = usersModel;
