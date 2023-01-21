'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdminInvitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminInvitation.init({
    email: DataTypes.STRING,
    validated: DataTypes.BOOLEAN,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AdminInvitation',
  });
  return AdminInvitation;
};
