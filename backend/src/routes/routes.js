import { Router } from 'express';
import FornecedorRoutes from '../routes/fornecedor';
import ProdutoRoutes from '../routes/produto';
import PedidoRoutes from '../routes/pedido';
import CepRoutes from '../routes/cep';

const routes = new Router();

routes.use('/fornecedor', FornecedorRoutes);
routes.use('/produto', ProdutoRoutes);
routes.use('/pedido', PedidoRoutes);
routes.use('/cep', CepRoutes);

export default routes;
