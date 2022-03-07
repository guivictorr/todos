import { Request, Response } from 'express';
import CreateUserService from 'services/CreateUserService';

class UserController {
  async create(req: Request, res: Response) {
    const { email, name, password } = req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ email, name, password });

    res.send(user);
  }
}

export default UserController;
