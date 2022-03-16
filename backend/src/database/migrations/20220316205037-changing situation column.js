'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.changeColumn('pedidos', 'situation', {
					type: Sequelize.DataTypes.ENUM,
					allowNull: false
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
			await queryInterface.removeColumn('pedidos', 'situation', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
