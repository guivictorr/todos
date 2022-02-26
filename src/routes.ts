import { Router } from 'express';
import TodoController from './controller/TodoController';

const todoController = new TodoController();
const router = Router();

router.get('/todos', todoController.index);
router.post('/todos', todoController.create);
router.put('/todos', todoController.update);
router.delete('/todos', todoController.delete);

export { router };