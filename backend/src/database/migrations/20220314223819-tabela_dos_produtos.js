'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('produtos', {
				id: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					autoIncrement: true,
					primaryKey: true
				},
				nome: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				preço: {
          type: Sequelize.DataTypes.FLOAT,
          allowNull: false
        },
        cliente: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
				created_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
				},
				updated_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
			await queryInterface.dropTable('produtos', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
