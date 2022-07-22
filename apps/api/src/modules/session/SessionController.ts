import { Request, Response } from 'express';
import UserRepository from 'modules/user/repository/UserRepository';
import SessionService from './SessionService';

class SessionController {
	async create(req: Request, res: Response) {
		const { email, password } = req.body;
		const userRepository = new UserRepository();
		const sessionService = new SessionService(userRepository);
		const session = await sessionService.execute({ email, password });

		res.send(session);
	}
}

export default SessionController;
