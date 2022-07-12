import { Subtodo } from '@prisma/client';
import AppError from '../error/AppError';
import { ISubtodoRepository } from '../repositories/SubtodoRepository';
import { ITodoRepository } from '../repositories/TodoRepository';

class CreateSubtodoService {
	constructor(
		private subtodoRepository: ISubtodoRepository,
		private todoRepository: ITodoRepository,
	) {}

	async execute(subtodo: Omit<Subtodo, 'id' | 'createdAt'>) {
		const parentTodo = await this.todoRepository.findById(subtodo.parentTodoId);

		if (!parentTodo) {
			throw new AppError('Parent todo not found', 404);
		}

		if (subtodo.title.length > 45) {
			throw new AppError('title should be less than 45 characters', 400);
		}

		if (subtodo.description.length > 150) {
			throw new AppError('description should be less than 150 characters', 400);
		}

		if (!subtodo.title || !subtodo.description) {
			throw new AppError('Title and description are required', 400);
		}

		const newSubtodo = this.subtodoRepository.create(subtodo);

		return newSubtodo;
	}
}

export default CreateSubtodoService;
