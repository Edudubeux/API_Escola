import { Router } from 'express';
import multer from 'multer';

import PhotoController from '../controllers/PhotoController';
import loginRequired from '../middlewares/loginRequired';
import multerConfig  from '../config/multerConfig';

const routes = new Router();

routes.use(loginRequired);

const upload = multer(multerConfig);

routes.post('/:id', upload.single('file'),PhotoController.store);

export default routes;
