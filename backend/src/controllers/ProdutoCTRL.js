import ProdutoService from '../services/Produto';

class ProdutoCTRL {
    async add (req, res) {
        try {
            if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

            const newProduto = ProdutoService.add(req.data, req.filter);
            return res.json(newProduto);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    };

    async index (req, res) {
        try {
            if(req.filter.id){
                const produto = await ProdutoService.find(req.filter);
                return res.json(produto);
            }

            const produtos = await ProdutoService.listAll(req.filter);
            return res.json(produtos);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    };

    async update (req, res) {
        try {
            if (!req.data) {
				return res.status(400).json({ error: "REQUIRED_FIELDS" })
			}

            const updatedProduto = await ProdutoService.update(req.data, req.filter);
            return res.json(updatedProduto);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    };

    async destroy (req, res) {
        try {
            const produto = await ProdutoService.destroy(req.filter);
            return res.json(produto);
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    };
};

export default new ProdutoCTRL();