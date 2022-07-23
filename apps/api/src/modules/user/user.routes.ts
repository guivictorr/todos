import { Router } from 'express';
import authenticate from 'middlewares/auth';

import UserController from './UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.put('/', authenticate, userController.update);

export default userRoutes;
