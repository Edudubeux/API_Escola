'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const transaction = await queryInterface.sequelize.transaction();

		try {
			await queryInterface.createTable('fornecedores', {
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
				email: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false,
					unique: true
				},
				cnpj: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				cep: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				rua: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				numero: {
					type: Sequelize.DataTypes.INTEGER,
					allowNull: false
				},
				bairro: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				cidade: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false
				},
				uf: {
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
				},
				deleted_at: {
					type: Sequelize.DataTypes.DATE,
					defaultValue: null
				}
			});

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
			await queryInterface.dropTable('fornecedores', { transaction });
			await queryInterface.dropTable('produtos', { transaction });
			await transaction.commit();
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};
