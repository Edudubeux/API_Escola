import Produto from '../models/Produto';

export default {
    add: async data => {
        const produto = await Produto.findOne({
            attributes: ['nome', 'preco'],
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
            attributes: ['id','nome', 'preco'],
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
            attributes: ['id', 'nome', 'preco' ],
        });

        return produtos;
    },

    update: async (data, id) => {
        const produto = await Produto.update(data, {
            attributes: ['id', 'nome', 'preco'],
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
            attributes: [ 'nome', 'preco' ],
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