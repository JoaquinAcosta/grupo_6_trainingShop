'use strict';

const sections = [
  {
    name : 'Destacados',
    createdAt : new Date()
  },
  {
    name : 'Novedades',
    createdAt : new Date()
  },
  {
    name : 'Ofertas',
    createdAt : new Date()
  },
  
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Sections', sections, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Sections', null, {});
     
  }
};
