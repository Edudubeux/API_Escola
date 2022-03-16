import Produto from '../models/Produto';

export default {
    add: async data => {
        const produto = await Produto.findOne({
            attributes: [ 'nome', 'preço' ],
            where: {
                nome: data.nome,
            }
        });

        if (produto) {
            throw { message: 'Esse produto ja existe.' };
        }

        return Produto.create(data);
    },

    find: async id => {
        const produto = await Produto.findOne({
            attributes: [ 'nome', 'preço' ],
            where: {
                id
            },
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return produto;
    },

    listAll: async () => {
        const produtos = await Produto.findAll({
            attributes: [ 'nome', 'preço' ],
        });

        return produtos;
    },

    update: async (data, id) => {
        const produto = await Produto.update(data, {
            attributes: [ 'nome', 'preço' ],
            where: {
                id
            }
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return produto;
    },

    destroy: async id => {
        const produto = await Produto.destroy({
            attributes: [ 'nome', 'preço' ],
            where: {
                id
            }
        });

        if(!produto) {
            throw { message: 'Produto não encontrado.' };
        }

        return;
    }
};