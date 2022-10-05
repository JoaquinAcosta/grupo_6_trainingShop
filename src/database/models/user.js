'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Address,{
        as: 'address',
        foreignKey: 'userId'
      });
      User.hasMany(models.Order,{
        as: 'orders',
        foreignKey: 'userId'
      });
      User.belongsTo(models.Rol,{
        as: 'rols',
        foreignKey: 'rolId'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};