import Fornecedor from "../models/Fornecedor";
import Produto from "../models/Produto";

export default {
    store: async data => {
        const fornecedor = await Fornecedor.findOne({
            attributes: [ 'email' ],
            where: {
                email: data.email
            }
        });

        if (fornecedor) {
            throw { message: 'Esse email já foi usado.' };
        }

        return Fornecedor.create(data);
    },
    // findOrder: async id => {
    //     const pedido = await Order.findOne({
    //         where: {
    //             id
    //         },
    //         include: [{
    //             model: PedidoProduto,
    //             required: true,
    //             include: [{
    //                 model: Produto,
    //                 attributes: ['id', 'name']
    //             }],
    //             attributes: ['id', 'product_id', 'order_id']
    //         }, {
    //             model: Fornecedor,
    //             paranoid: false,
    //             attributes: ['id', 'name']
    //         }],
    //         attributes: ['id', 'situtation', 'fornecedor_id']
    //     });
    // },
    find: async id => {
        const fornecedor = await Fornecedor.findByPk(id, {
            attributes: [ 'nome', 'email', 'cnpj' ],
            include: [{
                model: Produto,
                as: 'produtos',
                attributes: [ 'nome', 'preço' ]
            }]
        });

        if (!fornecedor) {
            throw { message: 'Fornecedor não encontrado.' };
        }

        return fornecedor;
    },

    listAll: async () => {
        const fornecedores = await Fornecedor.findAll({
            attributes: [ 'nome', 'email', 'cnpj' ],
        });

        return fornecedores;
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
            attributes: ['nome', 'email'],
			where: {
                id
			}
		});
        
		if (!fornecedor) {
			throw { message: "Fornecedor não encontrado" }
		};

		return fornecedor.destroy();
    } 
}