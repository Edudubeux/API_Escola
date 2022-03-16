import { Router } from 'express';
import FornecedorRoutes from '../routes/fornecedor';
import ProdutoRoutes from '../routes/produto';
import PedidoRoutes from '../routes/pedido';

const routes = new Router();

routes.use('/fornecedor', FornecedorRoutes);
routes.use('/produto', ProdutoRoutes);
routes.use('/pedido', PedidoRoutes);

export default routes;
