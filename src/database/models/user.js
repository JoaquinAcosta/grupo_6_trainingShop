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
  /* login de usuario */
  User.init({
    name: DataTypes.STRING,
    validate: {
      is: {
        args: /^[a-z]+$/i,
        msg: "No debe contener numeros(name)"
      }
    },
    lastName: DataTypes.STRING,
    validate: {
      is: {
        args: /^[a-z]+$/i,
        msg: "No debe contener numeros (lastName)"
      }
    },
    avatar: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true
    
  });
  return User;
};