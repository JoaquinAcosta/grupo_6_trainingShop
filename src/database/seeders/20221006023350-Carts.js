'use strict';

const carts = [
  {
    productId : 1,
    unityPrice : 4000,
    amount : 2,
    subtotal : 8000,
    orderId : 1,
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Carts', carts, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Carts', null, {});
     
  }
};

