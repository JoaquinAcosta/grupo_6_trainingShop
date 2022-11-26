'use strict';

const brands = [
  {
    name : 'MuscleTech',
    createdAt : new Date()
  },
  {
    name : 'Star Nutrition',
    createdAt : new Date()
  },
  {
    name : 'Optimum Nutrition',
    createdAt : new Date()
  },
  {
    name : 'Amix',
    createdAt : new Date()
  },
  {
    name : 'HTN',
    createdAt : new Date()
  },
  {
    name : 'FitWhey',
    createdAt : new Date()
  },
  {
    name : 'ENA Sport',
    createdAt : new Date()
  },
  {
    name : 'Protein Project',
    createdAt : new Date()
  },
  {
    name : 'BSN',
    createdAt : new Date()
  },
  {
    name : 'Olimp Nutrition',
    createdAt : new Date()
  },
  {
    name : 'Otra Marca',
    createdAt : new Date()
  }

]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Brands', brands, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Brands', null, {});
     
  }
};
