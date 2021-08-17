'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      songUrl: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      songImg: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        references: { model: "Users" },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      breedId: {
        references: { model: "Breeds" },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
