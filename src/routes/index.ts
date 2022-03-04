
  
import { Router } from 'express';
import todoRoutes from './todos';
import userRoutes from './user';
import sessionRoutes from './session';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/todos`, todoRoutes);
routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/session`, sessionRoutes);

export default routes;