import AppError from '../error/AppError';
import {
	ICreateTodoDTO,
	ITodoRepository,
} from '../repositories/ITodoRepository';
import { IUserRepository } from '../repositories/IUserRepository';

class CreateTodoService {
	constructor(
		private todoRepository: ITodoRepository,
		private userRepository: IUserRepository,
	) {}

	async execute(todo: ICreateTodoDTO) {
		const user = await this.userRepository.findById(todo.userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		return this.todoRepository.create(todo);
	}
}

export default CreateTodoService;
