import { Request, Response } from 'express';
import SessionService from 'services/SessionService';

class SessionController {
	async create(req: Request, res: Response) {
		const { email, password } = req.body;
		const sessionService = new SessionService();
		const session = await sessionService.execute({ email, password });
  
		res.send(session);
	}
}

export default SessionController;