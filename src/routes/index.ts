
  
import { Router } from 'express';
import todoRoutes from './todos';
import userRoutes from './user';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/todos`, todoRoutes);
routes.use(`${prefixRoutes}/user`, userRoutes);

export default routes;