import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import AppError from '../error/AppError';
import { IUserRepository } from '../repositories/UserRepository';

class CreateUserService {
	constructor(private userRepository: IUserRepository) {}

	async execute(user: Omit<User, 'createdAt' | 'id'>) {
		const verifyEmail = await this.userRepository.findByEmail(user.email);

		if (verifyEmail) {
			throw new AppError('Email already in use', 400);
		}

		const encryptedPassword = await hash(user.password, 8);

		const createdUser = await this.userRepository.create({
			...user,
			password: encryptedPassword,
		});

		return createdUser;
	}
}

export default CreateUserService;
