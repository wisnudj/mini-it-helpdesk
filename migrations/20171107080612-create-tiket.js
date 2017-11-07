'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tikets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER
      },
      TeknisiId: {
        type: Sequelize.INTEGER
      },
      AdminId: {
        type: Sequelize.INTEGER
      },
      Problem: {
        type: Sequelize.STRING
      },
      Feedback: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tikets');
  }
};