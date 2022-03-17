import { Router } from 'express';
import Validate from '../schemas/Validate';
import CepCTRL from '../controllers/CepCTRL';
import CepSchema from '../schemas/Cep';

const routes = new Router();

routes.get('/', Validate(CepSchema.index), CepCTRL.index);

export default routes;
