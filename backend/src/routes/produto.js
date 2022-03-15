import { Router } from 'express';
import Validate from '../schemas/Validate';
import ProdutoCTRL from '../controllers/ProdutoCTRL';
import ProdutoSchema from '../schemas/Produto';

const routes = new Router();

routes.post('', Validate(ProdutoSchema.add), ProdutoCTRL.add);
routes.get('/:id?', Validate(ProdutoSchema.index), ProdutoCTRL.index);
routes.put('/:id', Validate(ProdutoSchema.update), ProdutoCTRL.update);
routes.delete('/:id', Validate(ProdutoSchema.destroy), ProdutoCTRL.destroy);

export default routes;
