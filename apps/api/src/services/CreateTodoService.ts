import { Todo } from '@prisma/client';
import AppError from '../error/AppError';
import { ITodoRepository } from '../repositories/TodoRepository';
import { IUserRepository } from '../repositories/UserRepository';

class CreateTodoService {
	constructor(
		private todoRepository: ITodoRepository,
		private userRepository: IUserRepository,
	) {}

	async execute(todo: Omit<Todo, 'id' | 'createdAt'>) {
		const user = await this.userRepository.findById(todo.userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		return this.todoRepository.create(todo);
	}
}

export default CreateTodoService;
