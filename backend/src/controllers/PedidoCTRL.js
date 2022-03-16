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
};

export default new PedidoCTRL();