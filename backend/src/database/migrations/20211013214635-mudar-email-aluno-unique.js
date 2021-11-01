'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('students', 'email',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }
    )
  },

  down: async () => { }
};
