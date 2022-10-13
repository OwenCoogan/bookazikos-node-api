const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    occupation: DataTypes.STRING,
    description: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async  (user, options) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },

    },
    modelName: 'User',
  });
  return User;
};
