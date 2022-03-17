const cep = require('cep-promise');

class CepCTRL {
    async index(req, res) {
        try {
            const resultado = await cep(req.filter.cep);

            return res.json(resultado);
        } catch (error) {
            return res.status(400).json({ error: 'CEP Inválido' })
        };
    };
};

export default new CepCTRL();
