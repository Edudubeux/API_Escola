import { Model, DataTypes } from 'sequelize';

class Pedido extends Model {
    static init(sequelize) {
        super.init({
            situation: {
                type: DataTypes.STRING,
                defaultValue: 'OPEN'
            },
            created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
        }, {
			sequelize,
			timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'pedidos',
            paranoid: true
		})

        return this;
    };

    static associate(models) {
        this.belongsTo(models.Fornecedor, {foreignKey: 'fornecedor_id', as: 'fornecedor'});
        this.belongsToMany(models.Produto, {foreignKey: 'produto_id', as: 'produtos', through: 'produtos_pedidos'});
    }
};

export default Pedido;