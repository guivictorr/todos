import { User } from '@prisma/client';

import AppError from '../error/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

class UpdateUserService {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, user: Partial<User>) {
		const emailAlreadyInUse = await this.userRepository.findByEmail(user.email);
		const userExists = await this.userRepository.findById(id);

		if (!userExists) {
			throw new AppError('User not found', 404);
		}

		if (emailAlreadyInUse) {
			throw new AppError('Email already in use', 400);
		}

		return this.userRepository.update(id, user);
	}
}

export default UpdateUserService;
