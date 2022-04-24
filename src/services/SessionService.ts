import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import AppError from '../error/AppError';
import { sign } from 'jsonwebtoken';
import { IUserRepository } from '../repositories/UserRepository';

class SessionService {
	constructor(private userRepository: IUserRepository) {}

	async execute({ email, password }: Pick<User, 'email' | 'password'>) {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Invalid credentials', 401);
		}

		const { password: userPassword, ...restUser } = user;

		const isPasswordCorrect = await compare(password, userPassword);

		if (!isPasswordCorrect) {
			throw new AppError('Invalid credentials', 401);
		}

		const token = sign({}, String(process.env.APP_SECRET));

		return {
			token,
			user: restUser,
		};
	}
}

export default SessionService;
