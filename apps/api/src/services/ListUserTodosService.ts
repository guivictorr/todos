import AppError from '../error/AppError';
import TodoRepository from '../repositories/TodoRepository';
import UserRepository from '../repositories/UserRepository';

class ListUserTodos {
	constructor(
		private todoRepository: TodoRepository,
		private userRepository: UserRepository,
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
