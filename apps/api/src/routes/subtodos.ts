import { Router } from 'express';
import { SubtodoController } from '../controller/SubtodoController';

import authenticate from '../middlewares/auth';

const subtodoController = new SubtodoController();
const subtodoRoutes = Router();

subtodoRoutes.use(authenticate);

subtodoRoutes.post('/:parentTodoId', subtodoController.create);
subtodoRoutes.put('/:id', subtodoController.update);
subtodoRoutes.delete('/:id', subtodoController.delete);

export default subtodoRoutes;
