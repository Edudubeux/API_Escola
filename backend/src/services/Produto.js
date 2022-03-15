import Produto from '../models/Produto';

export default {
    add: async (data, filter) => {
        const produto = await Produto.findOne({
            attributes: [ 'nome', 'preço' ],
            where: {
                nome: data.nome,
                fornecedor_id: filter.fornecedor_id
            }
        });

        if (produto) {
            throw { message: 'Esse fornecedor já vende esse produto.' };
        }

        return Produto.create({ fornecedor_id: filter.fornecedor_id, ...data });
    },

    find: async filter => {
        const produto = await Produto.findOne({
            attributes: [ 'nome', 'preço' ],
            where: {
                id: filter.id,
                fornecedor_id: filter.fornecedor_id
            },
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return produto;
    },

    listAll: async  filter => {
        const produtos = await Produto.findAll({
            attributes: [ 'nome', 'preço' ],
            where: {
                fornecedor_id: filter.fornecedor_id
            }
        });

        return produtos;
    },

    update: async (data, filter) => {
        const produto = await Produto.update(data, {
            attributes: [ 'nome', 'preço' ],
            where: {
                id: filter.id,
                fornecedor_id: filter.fornecedor_id
            }
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return produto;
    },

    destroy: async filter => {
        const produto = await Produto.destroy({
            attributes: [ 'nome', 'preço' ],
            where: {
                id: filter.id,
                fornecedor_id: filter.fornecedor_id
            }
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return;
    }
};