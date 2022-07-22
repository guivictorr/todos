import { Router } from 'express';

import TodoController from './TodoController';
import { todoSchema } from './schemas/todo';
import authenticate from 'middlewares/auth';
import { validate } from 'middlewares/validate';

const todoController = new TodoController();
const todoRoutes = Router();

todoRoutes.use(authenticate);

todoRoutes.get('/:userId', todoController.index);
todoRoutes.delete('/:id', todoController.delete);

todoRoutes.use(validate(todoSchema));

todoRoutes.post('/:userId', todoController.create);
todoRoutes.put('/:id', todoController.update);

export default todoRoutes;
