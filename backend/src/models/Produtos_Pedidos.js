import { Model, DataTypes } from 'sequelize';

class ProdutosPedidos extends Model {
    static init(sequelize) {
        super.init({
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
            tableName: 'produtos_pedidos',
            paranoid: true
		});

        return this;
    }

    static associate(models) {
        console.log(models.Produto, 'models');
        this.belongsTo(models.Produto, { foreignKey: 'produto_id' });
        this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    };
};

export default ProdutosPedidos;