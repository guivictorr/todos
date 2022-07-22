import { Router } from 'express';
import todoRoutes from 'modules/todos/todos.routes';
import userRoutes from 'modules/user/user.routes';
import sessionRoutes from 'modules/session/session.routes';
import subtodoRoutes from 'modules/subtodos/subtodos.routes';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/todos`, todoRoutes);
routes.use(`${prefixRoutes}/subtodos`, subtodoRoutes);
routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/session`, sessionRoutes);

export default routes;
