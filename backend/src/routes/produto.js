import { Router } from 'express';
import Validate from '../schemas/Validate';
import ProdutoCTRL from '../controllers/ProdutoCTRL';
import ProdutoSchema from '../schemas/Produto';

const routes = new Router();

routes.post('/:fornecedor_id', Validate(ProdutoSchema.add), ProdutoCTRL.add);
routes.get('/:fornecedor_id/:id', Validate(ProdutoSchema.index), ProdutoCTRL.index);
routes.put('/:fornecedor_id/:id', Validate(ProdutoSchema.update), ProdutoCTRL.update);
routes.delete('/:fornecedor_id/:id', Validate(ProdutoSchema.destroy), ProdutoCTRL.destroy);

export default routes;
