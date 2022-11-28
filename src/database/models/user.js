/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
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
    paranoid : true
    
  });
  return User;
}; */

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
       len: objectValidate ([8,16],"longitud invalida, (mas de 8 y menos de 16) "),
       is: objectValidate(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/ , "la contrasenia debe tener entre 8 y 16 caracteres, almenos una minuscula,almenos una mayuscula"),

       hashPass(value){
        User.beforeCreate((user)=> {
          user.password =hashSync(value)
        })
       }
      },
    },
    
    phone:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        ...defaultValidationsRequiredFields,     
       /*  len: objectValidate ([8,12],"longitud invalida, (mas de 8 y menos de 12) "), */
       len: {
        args: [8,12],
        msg: "Nº de celular: longitud invalida, (mas de 8 y menos de 12)"
      }
      }
    },
    rolId: DataTypes.INTEGER,
 
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true
    
  });
  return User;
};
