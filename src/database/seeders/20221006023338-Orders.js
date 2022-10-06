'use strict';

const orders = [
  {
    userId : 1,
    date : new Date(),
    total : 20000,
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Orders', orders, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Orders', null, {});
     
  }
};

