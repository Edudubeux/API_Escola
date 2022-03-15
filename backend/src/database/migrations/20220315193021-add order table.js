'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('pedidos', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				situation: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
        fornecedor_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'fornecedores',
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
			await queryInterface.dropTable('pedidos', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
