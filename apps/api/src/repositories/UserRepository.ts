import { User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import { IUserRepository } from './IUserRepository';

class UserRepository implements IUserRepository {
	update(
		id: string,
		user: Omit<User, 'id' | 'createdAt'>,
	): Promise<Omit<User, 'password'>> {
		return prismaClient.user.update({
			data: user,
			where: { id },
			select: {
				id: true,
				createdAt: true,
				email: true,
				name: true,
				password: false,
			},
		});
	}
	findById(id: string): Promise<User> {
		return prismaClient.user.findUnique({
			where: { id },
		});
	}

	findByEmail(email: string): Promise<User | undefined> {
		return prismaClient.user.findFirst({
			where: { email },
		});
	}

	create(
		user: Omit<User, 'createdAt' | 'id'>,
	): Promise<Omit<User, 'password'>> {
		return prismaClient.user.create({
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
