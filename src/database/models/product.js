'use strict';
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
        onDelete: 'cascade'
      });
      Product.belongsTo(models.Section,{
        as: 'sections',
        foreignKey: 'sectionId'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};