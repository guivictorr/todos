import { Router } from 'express';
import { SubtodoController } from '../controller/SubtodoController';

import authenticate from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { todoSchema } from '../schemas/todo';

const subtodoController = new SubtodoController();
const subtodoRoutes = Router();

subtodoRoutes.use(authenticate);

subtodoRoutes.post(
	'/:parentTodoId',
	validate(todoSchema),
	subtodoController.create,
);
subtodoRoutes.put('/:id', validate(todoSchema), subtodoController.update);
subtodoRoutes.delete('/:id', subtodoController.delete);

export default subtodoRoutes;
