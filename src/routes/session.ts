import { Router } from 'express';

import SessionController from 'controller/SessionController';

const sessionController = new SessionController();
const todoRoutes = Router();

todoRoutes.post('/', sessionController.create);

export default todoRoutes;