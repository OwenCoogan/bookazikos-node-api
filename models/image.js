'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getType(options) {
      if (!this.imageType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.imageType)}`;
      return this[mixinMethodName](options);
    }
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: 'imageId',
        constraints: false
      });
      Image.belongsTo(models.Post, {
        foreignKey: 'imageId',
        constraints: false
      });
    }
  }
  Image.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    imageId: DataTypes.UUID,
    imageType: DataTypes.STRING,
    type: DataTypes.STRING,
    data: DataTypes.BLOB,
  }, {
    sequelize,
    modelName: 'Image',
    hooks: {
      afterFind: async  findResult => {
        if (!Array.isArray(findResult)) findResult = [findResult];
        for (const instance of findResult) {
          if (instance.imageType === "post" && instance.image !== undefined) {
            instance.imageType = instance.post;
          } else if (instance.imageType === "user" && instance.post !== undefined) {
            instance.imageType = instance.user;
          }
          delete instance.user;
          delete instance.dataValues.user;
          delete instance.post;
          delete instance.dataValues.post;
        }
      },
    }
  });
  return Image;
};
