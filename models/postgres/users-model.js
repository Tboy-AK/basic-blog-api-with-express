const { pg } = require('../../configs/rdbms-config');

const usersModel = pg('auths');

module.exports = usersModel;
