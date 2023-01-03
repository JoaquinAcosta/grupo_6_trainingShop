'use strict';
const {hashSync} = require('bcryptjs')

const users = [
  {
    name : 'Fabian',
    lastName : 'Coseglia',
    email : 'fabian@gmail.com',
    password : hashSync("123Aa!",10),
    avatar : null,
    phone : 123456,
    rolId : 1,
    createdAt : new Date()
  },
  {
    name : 'Leandro',
    lastName : 'Mumbach',
    email : 'user@gmail.com',
    password : hashSync("123Aa!",10),
    avatar : null,
    phone : 345678,
    rolId : 1,
    createdAt : new Date()
  },
  {
    name : 'Joaquin',
    lastName : 'Acosta',
    email : 'joaquin@gmail.com',
    password : hashSync("123Aa!",10),
    avatar : null,
    phone : 343434,
    rolId : 1,
    createdAt : new Date()
  },
  {
    name : 'Flora',
    lastName : 'Vargas',
    email : 'flora@gmail.com',
    password : hashSync("123Aa!",10),
    avatar : null,
    phone : 345678,
    rolId : 1,
    createdAt : new Date()
  },
  {
    name : 'Daniel',
    lastName : 'Zambrana',
    email : 'daniel@gmail.com',
    password : hashSync("123Aa!",10),
    avatar : null,
    phone : 345678,
    rolId : 1,
    createdAt : new Date()
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Users', users, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
