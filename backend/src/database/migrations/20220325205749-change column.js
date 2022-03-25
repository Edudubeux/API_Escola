'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.changeColumn('produtos_pedidos', 'produto_id', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'produtos',
          key: 'id'
        }
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    };
  },

  down: async queryInterface => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('produtos_pedidos', 'produto_id', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
