import { Router } from 'express';

import StudentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';
import StudentSchema from '../schemas/Student';
import Validate from '../schemas/Validate';

const routes = new Router();

routes.use(loginRequired);

routes.post('/', Validate(StudentSchema.store), StudentController.store);
routes.get('/', StudentController.index);
routes.delete('/:id', Validate(StudentSchema.destroy), StudentController.destroy);
routes.put('/:id', Validate(StudentSchema.update), StudentController.update);

export default routes;
