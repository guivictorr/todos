import { Router } from 'express';
import authenticate from 'middlewares/auth';
import { validate } from 'middlewares/validate';
import { userSchema } from './schemas/user';

import UserController from './UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.use(validate(userSchema));

userRoutes.post('/', userController.create);
userRoutes.put('/', authenticate, userController.update);

export default userRoutes;
