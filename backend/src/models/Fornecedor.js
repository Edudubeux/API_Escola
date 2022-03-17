import { Model, DataTypes } from 'sequelize';

class Fornecedor extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING(255),
            email: {
				type: DataTypes.STRING(255),
				unique: {
					msg: 'Esse email já foi usado.'
				}
			},
            cnpj: DataTypes.STRING(),
            cep: DataTypes.STRING(),
            rua: DataTypes.STRING(),
            bairro: DataTypes.STRING(),
            cidade: DataTypes.STRING(),
            uf: DataTypes.STRING(),
            created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
        }, {
            sequelize,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at',
            tableName: 'fornecedores',
            paranoid: true
        });

        return this;
    }

    static associate (models) {
        this.hasMany(models.Pedido, {foreignKey: 'fornecedor_id', as: 'pedidos'});
    };
};

export default Fornecedor;