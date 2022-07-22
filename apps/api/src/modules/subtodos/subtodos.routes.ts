import { Router } from 'express';
import { SubtodoController } from './SubtodoController';

import authenticate from 'middlewares/auth';
import { validate } from 'middlewares/validate';
import { todoSchema } from 'modules/todos/schemas/todo';

const subtodoController = new SubtodoController();
const subtodoRoutes = Router();

subtodoRoutes.use(authenticate);

subtodoRoutes.delete('/:id', subtodoController.delete);

subtodoRoutes.use(validate(todoSchema));

subtodoRoutes.post('/:parentTodoId', subtodoController.create);
subtodoRoutes.put('/:id', subtodoController.update);

export default subtodoRoutes;
