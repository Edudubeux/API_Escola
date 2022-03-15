import { Router } from 'express';
import FornecedorRoutes from '../routes/fornecedor';
import ProdutoRoutes from '../routes/produto';

const routes = new Router();

routes.use('/fornecedor', FornecedorRoutes);
routes.use('/produto', ProdutoRoutes);

export default routes;
