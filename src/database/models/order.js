'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product,{
        as: 'product',
        through: 'Carts',
        foreignKey: 'cartId',
        otherKey: 'productId'

      });
      Order.belongsTo(models.User,{
        as: 'users',
        foreignKey: 'userId'
      });
    }
  }
  Order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};