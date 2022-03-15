'use strict';

module.exports = {
	up: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.removeColumn('produtos', 'fornecedor_id')
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		};
	},

	down: async queryInterface => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.addColumn('produtos', 'fornecedor_id', {
        type: Sequelize.DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: 'fornecedores',
						key: 'id'
					}
      }, { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
