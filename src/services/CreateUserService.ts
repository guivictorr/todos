import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { prismaClient } from 'database/prismaClient';
import AppError from 'error/AppError';

class CreateUserService { 
	async execute(user: Omit<User, 'createdAt' | 'id'>) {
		const verifyEmail = await prismaClient.user.findFirst({ where: { email: user.email } });

		if (verifyEmail) {
			throw new AppError('Email already in use', 400);
		}
    
		const encryptedPassword = await hash(user.password, 8);
    
		const createdUser = await prismaClient.user.create({
			data: {
				...user,
				password: encryptedPassword
			},
			select: {
				id: true,
				createdAt: true,
				email: true,
				name: true,
				password: false
			}
		});

		return createdUser;
	}
}

export default CreateUserService;