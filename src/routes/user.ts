import { Router } from 'express';

import UserController from '../controller/UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.put('/:userId', userController.update);

export default userRoutes;
