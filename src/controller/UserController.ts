import { Request, Response } from 'express';
import UserRepository from 'repositories/UserRepository';
import CreateUserService from 'services/CreateUserService';

class UserController {
	async create(req: Request, res: Response) {
		const { email, name, password } = req.body;

		const userRepository = new UserRepository();
		const createUserService = new CreateUserService(userRepository);
		const user = await createUserService.execute({ email, name, password });

		res.send(user);
	}
}

export default UserController;
