import { User } from '@prisma/client';

import AppError from '../error/AppError';
import { IUserRepository } from '../repositories/UserRepository';

class UpdateUserService {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, user: Omit<User, 'id' | 'createdAt'>) {
		const emailAlreadyInUse = await this.userRepository.findByEmail(user.email);
		const userExists = await this.userRepository.findById(id);

		if (!userExists) {
			throw new AppError('User not found', 404);
		}

		if (id !== emailAlreadyInUse?.id && emailAlreadyInUse) {
			throw new AppError('Email already in use', 400);
		}

		const updatedUser = await this.userRepository.update(id, user);

		return updatedUser;
	}
}

export default UpdateUserService;
