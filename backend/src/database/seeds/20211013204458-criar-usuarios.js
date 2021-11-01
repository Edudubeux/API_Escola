const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Eduardo',
          email: 'eduardo@demo.com',
          password_hash: await bcryptjs.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Luca',
          email: 'Luca@demo.com',
          password_hash: await bcryptjs.hash('bengay', 8),
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Romeo',
          email: 'Romeo@demo.com',
          password_hash: await bcryptjs.hash('muitogay', 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async () => { }
};
