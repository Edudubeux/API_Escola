import { Router } from 'express';

import TokenController from '../controllers/TokenController';

const routes = new Router();

routes.post('/', TokenController.store);

export default routes;
