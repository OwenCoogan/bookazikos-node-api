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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    imageData: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
