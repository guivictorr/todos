import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { prismaClient } from 'database/prismaClient';
import AppError from 'error/AppError';
import { sign } from 'jsonwebtoken';

class SessionService {
	async execute({ email, password }: Pick<User, 'email' | 'password'>) {
		const user = await prismaClient.user.findFirst({ where: { email } });

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