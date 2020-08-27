'use strict';
const sequelize = require('sequelize');
const db = require('./index');
const {
  STRING, INTEGER, DATE
} = sequelize;
module.exports = db.sequelize.define(
  'Blogs',
  {
    content: {
      type: STRING,
      allowNull: false,
    },
    authorId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'Auths',
        key: 'id'
      }
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
  modelName: 'Blogs',
  timestamps: true,
  comment: 'Blog post by users',
  hooks: {
    beforeUpdate: (auths) => {
      auths.increment('_v', { by: 1 });
    },
  },
});
