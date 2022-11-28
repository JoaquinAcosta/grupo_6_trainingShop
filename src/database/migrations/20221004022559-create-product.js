'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      brandId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Brands'
          },
          key : 'id'
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: 
          {
            model : {
              tableName : 'Categories'
            },
            key : 'id'
          }
       },
      sectionId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Sections'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};