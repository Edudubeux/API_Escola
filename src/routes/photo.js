import { Router } from 'express';

import PhotoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.use(loginRequired);

routes.post('/', PhotoController.store);

export default routes;
