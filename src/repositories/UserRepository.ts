import { User } from '@prisma/client';
import { prismaClient } from 'database/prismaClient';

export interface IUserRepository {
	create(user: Omit<User, 'createdAt' | 'id'>): Promise<Omit<User, 'password'>>;
	findByEmail(email: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
	async findByEmail(email: string): Promise<User | null> {
		return await prismaClient.user.findFirst({
			where: { email },
		});
	}
	async create(
		user: Omit<User, 'createdAt' | 'id'>,
	): Promise<Omit<User, 'password'>> {
		return await prismaClient.user.create({
			data: user,
			select: {
				id: true,
				createdAt: true,
				email: true,
				name: true,
				password: false,
			},
		});
	}
}

export default UserRepository;
