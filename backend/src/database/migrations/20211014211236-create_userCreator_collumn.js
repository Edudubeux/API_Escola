'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('students', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('students', 'user_id');
  }
};
