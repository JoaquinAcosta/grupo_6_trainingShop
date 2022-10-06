'use strict';

const addresses = [
  {
    street : 'Avenida Siempre Viva',
    city : 'Sprinfield',
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Addresses', addresses, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Addresses', null, {});
     
  }
};
