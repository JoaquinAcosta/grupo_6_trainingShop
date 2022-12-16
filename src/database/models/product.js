'use strict';

const { defaultValidationsRequiredFields, objectValidate } = require('../resource');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand,{
        as: 'brand',
        foreignKey: 'brandId'
      });
      Product.belongsToMany(models.Cart,{
        as: 'cart',
        through: 'Carts',
        foreignKey: 'productId',
        otherKey: 'cartId'

      });
      Product.belongsTo(models.Category,{
        as: 'categories',
        foreignKey: 'categoryId'
      });
      Product.hasMany(models.Image,{
        as: 'images',
        foreignKey: 'productId',
        onDelete : 'cascade'
      });
      Product.belongsTo(models.Section,{
        as: 'sections',
        foreignKey: 'sectionId'
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        len:objectValidate([3],"Longitud minima 3 caracteres")
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        len: objectValidate([20], "Longitud minima 20 caracteres")
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        isInt: objectValidate(/[0-9]/g, "el precio debe ser un número")
      }
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        isInt: objectValidate(true, "la marca es invalida")
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        isInt: objectValidate(true, "la categoria es invalida")
      }
    },
    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        ...defaultValidationsRequiredFields,
        /* isInt: objectValidate(true, "la seccion es invalida") */
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
    paranoid : true
  });
  return Product;
};