import { Router } from 'express';

import studentRoutes from './student';
import userRoutes from './user';
import photoRoutes from './photo';
import tokenRoutes from './token';

const routes = new Router();

routes.use('/students', studentRoutes);
routes.use('/users', userRoutes);
routes.use('/photos', photoRoutes);
routes.use('/tokens', tokenRoutes);

export default routes;
