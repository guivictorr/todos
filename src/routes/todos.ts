import { Router } from 'express';

import TodoController from '../controller/TodoController';

const todoController = new TodoController();
const todoRoutes = Router();

todoRoutes.get('/', todoController.index);
todoRoutes.post('/', todoController.create);
todoRoutes.put('/', todoController.update);
todoRoutes.delete('/', todoController.delete);

export default todoRoutes;