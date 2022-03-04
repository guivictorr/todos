import { Router } from 'express';

import UserController from 'controller/UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post('/', userController.create);

export default userRoutes;