'use strict';
const {
  Model, UnknownConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    existEmail(value) {
      return new Promise ((resolve, reject) => {
        const user = User.findOne ({where:{email:value}})
        if(user){
          resolve(true)
        }
        reject(false)
      })
    }



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
    name: {
      type: DataTypes.STRING,
    validate: {
      is: {
        args: /^[a-z]+$/i,
        msg: "No debe contener numeros(name)"
      }
    }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: "No debe contener numeros(lastName)"
        }
      }
    },
   
    avatar: DataTypes.STRING,



    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Ingrese un email valido",
        },
        async email(value){ /* "emailemail" : Unknown word.  */
        const exist = await this.existEmail(value)
        if(exist){
          throw new error('El mail ya existe');
        }
        }
      }
    
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNull: {
          args: true,
          msg: "No puede ser nulo"
        },
        notEmpty: {
          args: true,
          msg: "No puede ser nulo"
        },
        isAlphanumeric: {
          args: true,
          msg: "Contraseña invalida"
        }
      }
    },
    


    phone: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true
    
  });
  return User;
};
