import { Request, Response } from 'express';
import UserRepository from './repository/UserRepository';
import CreateUserService from './services/CreateUserService';
import UpdateUserService from './services/UpdateUserService';

class UserController {
	async create(req: Request, res: Response) {
		const { email, name, password } = req.body;

		const userRepository = new UserRepository();
		const createUserService = new CreateUserService(userRepository);
		const user = await createUserService.execute({ email, name, password });

		res.send(user);
	}

	async update(req: Request, res: Response) {
		const { email, name, password } = req.body;
		const { id } = res.locals.user;

		const userRepository = new UserRepository();
		const createUserService = new UpdateUserService(userRepository);
		const user = await createUserService.execute(id, {
			email,
			name,
			password,
		});

		res.send(user);
	}
}

export default UserController;
