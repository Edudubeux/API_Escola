import { Router } from 'express';
import Validate from '../schemas/Validate';
import FornecedorCTRL from '../controllers/FornecedorCTRL';
import FornecedorSchema from '../schemas/Fornecedor';

const routes = new Router();

routes.post('/', Validate(FornecedorSchema.add), FornecedorCTRL.add);
routes.get('/:id', Validate(FornecedorSchema.find), FornecedorCTRL.index);
routes.get('/', FornecedorCTRL.index);
routes.put('/:id', Validate(FornecedorSchema.update), FornecedorCTRL.update);
routes.delete('/:id', Validate(FornecedorSchema.destroy), FornecedorCTRL.destroy);

export default routes;
