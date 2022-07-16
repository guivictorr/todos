import AppError from '../error/AppError';
import { ITodoRepository } from '../repositories/TodoRepository';
import { IUserRepository } from '../repositories/UserRepository';

class ListUserTodos {
	constructor(
		private todoRepository: ITodoRepository,
		private userRepository: IUserRepository,
	) {}

	async execute(userId: string) {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		return this.todoRepository.findByUserId(userId);
	}
}

export default ListUserTodos;
