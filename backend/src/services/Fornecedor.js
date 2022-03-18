import Fornecedor from '../models/Fornecedor';
import Pedido from '../models/Pedido';
import Produto from '../models/Produto';

export default {
    store: async data => {
        const fornecedor = await Fornecedor.findOne({
            attributes: [ 'email' ],
            where: {
                email: data.email
            }
        });

        if (fornecedor) {
            throw { message: 'Usuário já cadastrado.' };
        }

        return Fornecedor.create(data);
    },

    find: async id => {
        const fornecedor = await Fornecedor.findByPk(id, {
            attributes: [ 'nome', 'email', 'cnpj' ],
            include: [{
                model: Pedido,
                as: 'pedidos',
                attributes: ['id'],
                paranoid: false,
                include: [{
                    model: Produto,
				    as: 'produtos',
				    paranoid: false,
				    attributes: ['nome', 'preço']
                }]
            }]
        });

        if (!fornecedor) {
            throw { message: 'Fornecedor não encontrado.' };
        }

        return fornecedor;
    },

    listAll: async () => {
        const fornecedores = await Fornecedor.findAll({
            attributes: [ 'nome', 'email', 'cnpj', 'cep', 'rua', 'bairro', 'cidade', 'uf' ],
        });

        return {
            data: fornecedores
        };
    },

    update: async (data, id) => {
        const fornecedor = await Fornecedor.update(data, {
            where: { id }
        }, {
            attributes: [ 'nome', 'email', 'cnpj' ],
        });

        if (!fornecedor) {
            throw { message: 'Fornecedor não encontrado.' };
        }
        return fornecedor; 
    },

    destroy: async id => {
        const fornecedor = await Fornecedor.findOne({
            attributes: ['id', 'nome', 'email', 'cnpj'],
			where: {
                id
			}
		});
        
		if (!fornecedor) {
			throw { message: 'Fornecedor não encontrado' }
		};

		return fornecedor.destroy();
    } 
}