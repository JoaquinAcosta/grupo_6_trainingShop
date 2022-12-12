'use strict';
const { hashSync } = require('bcryptjs');
const { Model} = require('sequelize');
const { objectValidate, defaultValidationsRequiredFields } = require('../resource');
const {unlinkSync} =require ('fs')
const {join} = require ('path')



module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    existEmail(value) {
      return new Promise ((resolve, reject) => {
        const user = User.findOne ({where:{email:value}})

          resolve(user)
    
      })
    }



    static associate(models) {
      
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
    name: {
      type: DataTypes.STRING,
    validate: {
      is: objectValidate(/^[a-z]+$/i,"Nombre no puede estar vacio ni contener números")
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        is: objectValidate(/^[a-z]+$/i,"Apellido no puede estar vacio ni debe contener números")
      }
    },
   
    avatar: 
    {
      type: DataTypes.STRING,
      validate: {
        isImage(value){
          if(!/.png|.jpg|.jpeg|.webp/i.test(value)){
            unlinkSync(join(__dirname,`../../../public/images/avatars/${value}`))
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
       is: objectValidate(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/ , "La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un caracter especial"),

      /*  hashPass(value){
        User.beforeCreate((user)=> {
          user.password =hashSync(value)
        })
       } */ //esto impredia loguear con usuarios nuevos.
      },
    },
    
    phone:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rolId: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true
    
  });
return User;
};