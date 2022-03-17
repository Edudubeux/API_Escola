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

		await ProdutoPedido.bulkCreate(produtosPedidos);

		return pedido;
	},

	find: async id => {
		const pedido = await Pedido.findOne({
			where: {
				id
			},
			paranoid: false,
			attributes: ['fornecedor_id', 'situation'],
			include: [{
				model: Fornecedor,
				as: 'fornecedor',
				paranoid: false,
				attributes: ['id', 'nome']
			},{
				model: Produto,
				as: 'produtos',
				paranoid: false,
				attributes: ['nome', 'preço']
			}]
		});

		if(!pedido) {
			throw {message: 'Pedido não encontrado.'}
		}

		return pedido;
	},

	listAll: async fornecedor_id => {
		const pedidos = await Pedido.findAll({
			where: {
				fornecedor_id
			},
			paranoid: false,
			attributes: ['fornecedor_id', 'situation'],
			include: [{
				model: Fornecedor,
				as: 'fornecedor',
				paranoid: false,
				attributes: ['id', 'nome']
			},{
				model: Produto,
				as: 'produtos',
				paranoid: false,
				attributes: ['nome', 'preço']
			}] 
		});

		if(!pedidos) {
			throw {message: 'Não existem pedidos desse fornecedor.'}
		}

		return pedidos;
	},

	update: async (data, id) => {
		const pedido = await Pedido.findOne({
			where: {
				fornecedor_id: data.fornecedor_id,
				id
			},
			attributes: ['id','fornecedor_id', 'situation'],
			include: [{
				model: Fornecedor,
				as: 'fornecedor',
				paranoid: false,
				attributes: ['id', 'nome']
			},{
				model: Produto,
				as: 'produtos',
				paranoid: false,
				attributes: ['nome', 'preço']
			}]
		});

		if(!pedido) {
			throw {message: 'Pedido não encontrado.'}
		}

		if(pedido.situation !== 'OPEN') {
			throw {message: 'Pedido finalizado ou cancelado.'}
		}

		return pedido.update(data)
	},

	destroy: async id => {
		const pedido = await Pedido.findOne({
			where: {
				id
			},
			attributes: ['id', 'situation', 'fornecedor_id']
		});

		if(!pedido) {
			throw {message: 'Pedido não encontrado.'}
		}

		await pedido.update({situation: 'DONE'});

		return pedido.destroy();
	}
};