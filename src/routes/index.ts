
  
import { Router } from 'express';
import todoRoutes from './todos';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/todos`, todoRoutes);

export default routes;