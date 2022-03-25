import PedidoService from '../services/Pedido';

class PedidoCTRL {
	async add (req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

			const newPedido = await PedidoService.add(req.data);
			return res.json(newPedido);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
	};

	async index (req, res) {
		try {
			if(req.filter.id) {
				const pedido = await PedidoService.find(req.filter.id);
				return res.json(pedido);
			}
			
			const pedidos = await PedidoService.listAll();
			return res.json(pedidos);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
	};

	async update (req, res) {
		try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

			const updatedPedido = await PedidoService.update(req.data, req.filter.id);
			return res.json(updatedPedido);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
	};

	async destroy (req, res) {
		try {
			const pedido = await PedidoService.destroy(req.filter.id);
			return res.json(pedido);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
	};
};

export default new PedidoCTRL();