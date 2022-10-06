'use strict';
const categories = [
  {
    name : 'Aminoácidos',
    createdAt : new Date()
  },
  {
    name : 'Creatina',
    createdAt : new Date()
  },
  {
    name : 'Ganadores de peso',
    createdAt : new Date()
  },
  {
    name : 'Multivitamínicos',
    createdAt : new Date()
  },
  {
    name : 'Proteínas',
    createdAt : new Date()
  },
  {
    name : 'Quemadores',
    createdAt : new Date()
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
     await queryInterface.bulkInsert('Categories', categories, {});
   
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('Categories', null, {});
    
  },
};
