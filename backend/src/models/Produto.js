import { Model, DataTypes } from 'sequelize';

class Produto extends Model {
	static init(sequelize) {
		super.init({
			nome: DataTypes.STRING(255),
			preço: DataTypes.FLOAT,
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			}
		}, {
			sequelize,
			timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'produtos',
            paranoid: true
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.Fornecedor, { foreignKey: 'fornecedor_id', as: 'fornecedor' });
	};
};

export default Produto;