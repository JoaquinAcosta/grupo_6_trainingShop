'use strict';

const { unlinkSync } = require("fs");
const {join} = require("path");
const { defaultValidationsRequiredFields, objectValidate } = require('../resource');
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
      // define association here
      Image.belongsTo(models.Product,{
        as: 'products',
        foreignKey: 'productId',
        onDelete: 'cascade'
      });
    }
  }
  Image.init({
    file: {
      type: DataTypes.STRING,
      defaultValue: "default-image.png",
      allowNull:false,
      validate: {
        ...defaultValidationsRequiredFields,
        isImage(value){
          if(!/.png|.jpg|.jpeg|.webp/i.test(value)){
            unlinkSync(join(__dirname,`../../../public/images/productsImage/${value}`)) 
            throw new Error("Archivo invalido")
          }
        }
      }
     },
    productId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        ...defaultValidationsRequiredFields,
        isInt:objectValidate(true,"Valor inválido")
      }
    },
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Image',
    paranoid: true,
    
  });
  return Image;
};