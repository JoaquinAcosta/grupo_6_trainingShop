'use strict';
const { hashSync } = require('bcryptjs');
const { Model, /* UnknownConstraintError */} = require('sequelize');
const { objectValidate, defaultValidationsRequiredFields } = require('../resource');
const {unlinkSync} =require ('fs')
const {join} = require ('path')



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /*
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    existEmail(value) {
      return new Promise ((resolve, reject) => {
        const user = User.findOne ({where:{email:value}})

          resolve(user)
    
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
      is: objectValidate(/^[a-z]+$/i,"No debe contener numeros(name)")
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: objectValidate(/^[a-z]+$/i,"No debe contener numeros(lastName)")
      }
    },
   
    avatar: 
    {
      type: DataTypes.STRING,
      validate: {
        isImage(value){
          if(!/.png|.jpg|.jpeg|.webp/i.test(value)){
            unlinkSync(join)
            throw new Error ("Archivo invalido")
          }
        }
      }
    },
      
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          ...defaultValidationsRequiredFields,
          isNull:objectValidate(false,"Ingrese un mail valido"),

          async email(value){
            const exist = await this.existEmail(value)
            if(exist){
              throw new Error('El mail ya existe')
            }
          }
      }  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        ...defaultValidationsRequiredFields,

       isAlphanumeric: objectValidate( true, "Contraseña invalida, solo numeros y letras"),
       len: objectValidate ([8,16],"longitud invalida, (mas de 8 y menos de 16) "),
       is: objectValidate(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/ , "la contrasenia debe tener entre 8 y 16 caracteres, almenos una minuscula,almenos una mayuscula"),

       hashPass(value){
        User.beforeCreate((user)=> {
          user.password =hashSync(value)
        })
       }


      },
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
