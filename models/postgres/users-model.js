const { pg } = require('../../configs/knex-pg-config');

const usersModel = pg.schema('users');

module.exports = usersModel;
