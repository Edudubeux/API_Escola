import Pedido from '../models/Pedido';
import Produto from '../models/Produto';
import Fornecedor from '../models/Fornecedor';
import ProdutoPedido from '../models/Produtos_Pedidos'

// import { readFileSync } from 'fs'
// const html = readFileSync('./src/routes/1.html', 'utf8');

export default {
    add: async data => {
        const { fornecedor_id, produto_id } = data;

        const pedido = await Pedido.create({
            fornecedor_id
        });

        const produtosPedidos = produto_id.map(produto_id => {
            return {
                produto_id,
                pedido_id: pedido.id
            }
        });

        return ProdutoPedido.bulkCreate(produtosPedidos);
    },

    find: async (data, id) => {
        const pedido = await Pedido.findOne({
            where: {
                id
            },
            include: [{
                model: ProdutoPedido,
                required: true,
                include: [{
                    model: Produto,
                    attributes: ['id', 'name']
                }],
                attributes: ['id', 'produto_id', 'pedido_id']
            }, {
                model: Fornecedor,
                paranoid: false,
                attributes: ['id', 'name']
            }],
            attributes: ['id', 'situtation', 'fornecedor_id']
        });
    },

    update: async data => {

    },

    destroy: async data => {

    }
};