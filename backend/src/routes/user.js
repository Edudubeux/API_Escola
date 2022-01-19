import { Router } from 'express';

import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';
import Schema from '../schemas/User';
import Validate from '../schemas/Validate'

const routes = new Router();

routes.post('/', Validate(Schema.store), UserController.store);

routes.use(loginRequired);

routes.get('/', UserController.index);
routes.put('/', Validate(Schema.update), UserController.update);
routes.delete('/', Validate(Schema.destroy), UserController.destroy);

export default routes;
