'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsToMany(models.Post,{
        foreignKey: 'tagId',
        through: 'PostImages',
        as: 'image'
      })
    }
  }
  Image.init({
    id: DataTypes.UUID,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
