import AppError from '../error/AppError';
import {
	ICreateSubtodoDTO,
	ISubtodoRepository,
} from '../repositories/ISubtodoRepository';
import { ITodoRepository } from '../repositories/ITodoRepository';

class CreateSubtodoService {
	constructor(
		private subtodoRepository: ISubtodoRepository,
		private todoRepository: ITodoRepository,
	) {}

	async execute(subtodo: ICreateSubtodoDTO) {
		const parentTodo = await this.todoRepository.findById(subtodo.parentTodoId);

		if (!parentTodo) {
			throw new AppError('Parent todo not found', 404);
		}

		const newSubtodo = this.subtodoRepository.create(subtodo);

		return newSubtodo;
	}
}

export default CreateSubtodoService;
