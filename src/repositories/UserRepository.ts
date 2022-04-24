import { User } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export interface IUserRepository {
	create(user: Omit<User, 'createdAt' | 'id'>): Promise<Omit<User, 'password'>>;
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	update(
		id: string,
		user: Omit<User, 'id' | 'createdAt'>,
	): Promise<Omit<User, 'password'>>;
}

class UserRepository implements IUserRepository {
	async update(
		id: string,
		user: Omit<User, 'id' | 'createdAt'>,
	): Promise<Omit<User, 'password'>> {
		return await prismaClient.user.update({
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
	async findById(id: string): Promise<User | null> {
		return await prismaClient.user.findUnique({
			where: { id },
		});
	}

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
