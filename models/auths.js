'use strict';
const sequelize = require('sequelize');
const db = require('./index');
const { DATE } = require('sequelize');
const {
  STRING, INTEGER, ENUM,
} = sequelize;
module.exports = db.sequelize.define(
  'Auth',
  {
    firstName: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isAlpha: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
        isAlpha: true,
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 100],
        isEmail: true,
      },
    },
    phone: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
    },
    userType: {
      type: ENUM,
      allowNull: false,
      defaultValue: 'user',
      values: ['admin', 'user'],
    },
    _v: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  }, {
  sequelize,
  modelName: 'Auths',
  timestamps: true,
  comment: 'All users and their common required data',
  hooks: {
    beforeUpdate: (auths) => {
      auths.increment('_v', { by: 1 });
    },
  },
});
