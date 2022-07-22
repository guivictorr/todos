import AppError from 'error/AppError';
import { ICreateTodoDTO, ITodoRepository } from '../repository/ITodoRepository';
import { IUserRepository } from 'modules/user/repository/IUserRepository';

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
