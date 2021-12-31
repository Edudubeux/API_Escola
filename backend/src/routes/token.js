import { Router } from 'express';

import TokenController from '../controllers/TokenController';
import TokenSchema from '../schemas/Token';
import Validate from '../schemas/Validate'

const routes = new Router();

routes.post('/',Validate(TokenSchema.store), TokenController.store);

export default routes;
