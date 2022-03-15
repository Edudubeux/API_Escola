import FornecedorServices from '../services/Fornecedor';

class FornecedorCTRL {
    async add(req, res) {
        try {
			if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

			const newFornecedor = await FornecedorServices.store(req.data);
			return res.json(newFornecedor);
		} catch (error) {
			return res.status(400).json({ error: error.message })
		};
    };

    async index(req, res) {
        try {
            if (req.filter){
                const fornecedor = await FornecedorServices.find(req.filter.id);
                return res.json(fornecedor);
            }

            const fornecedores = await FornecedorServices.listAll();
            return res.json(fornecedores);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        };
    };

    async update(req, res) {
        try {
            if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

            const updatedFornecedor = await FornecedorServices.update(req.data, req.filter.id);
            return res.json(updatedFornecedor);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        };
    };

    async destroy(req, res) {
        try {
            const fornecedor = await FornecedorServices.destroy(req.filter.id);

            return res.json(fornecedor);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        };
    };
};

export default new FornecedorCTRL();
