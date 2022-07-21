import { hash } from 'bcrypt';
import AppError from '../error/AppError';
import {
	ICreateUserDTO,
	IUserRepository,
} from '../repositories/IUserRepository';

class CreateUserService {
	constructor(private userRepository: IUserRepository) {}

	async execute(user: ICreateUserDTO) {
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
