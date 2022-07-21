import { Router } from 'express';
import todoRoutes from './todos.routes';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import subtodoRoutes from './subtodos.routes';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/todos`, todoRoutes);
routes.use(`${prefixRoutes}/subtodos`, subtodoRoutes);
routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/session`, sessionRoutes);

export default routes;
