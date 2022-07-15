import { Router } from 'express';

import TodoController from '../controller/TodoController';
import { todoSchema } from '../schemas/todo';
import authenticate from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const todoController = new TodoController();
const todoRoutes = Router();

todoRoutes.use(authenticate);

todoRoutes.get('/:userId', todoController.index);
todoRoutes.post('/:userId', validate(todoSchema), todoController.create);
todoRoutes.put('/:id', validate(todoSchema), todoController.update);
todoRoutes.delete('/:id', todoController.delete);

export default todoRoutes;
