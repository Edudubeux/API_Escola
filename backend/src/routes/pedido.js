import { Router } from 'express';
import Validate from '../schemas/Validate';
import PedidoCTRL from '../controllers/PedidoCTRL';
import PedidoSchema from '../schemas/Pedido';

const routes = new Router();

routes.post('/', Validate(PedidoSchema.add), PedidoCTRL.add);
routes.get('/:id?', Validate(PedidoSchema.index), PedidoCTRL.index);
routes.put('/:id', Validate(PedidoSchema.update), PedidoCTRL.update);
routes.delete('/:id', Validate(PedidoSchema.destroy), PedidoCTRL.destroy);

export default routes;
