'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('produtos_pedidos', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
        produto_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'produtos',
            key: 'id'
          }
        },
        pedido_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'pedidos',
            key: 'id'
          }
        },
				created_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				},
				updated_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				},
				deleted_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: null
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
			await queryInterface.dropTable('produtos_pedidos', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
