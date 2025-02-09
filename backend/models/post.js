import { DataTypes } from '@sequelize/core';
import { sequelize } from '../database.js';
import { User } from './user.js';

export const Post = sequelize.define('post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

User.hasMany(Post, {
  foreignKey: 'authorId'
});
Post.belongsTo(User, {
  foreignKey: 'authorId'
});