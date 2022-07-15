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

		const newSubtodo = this.subtodoRepository.create(subtodo);

		return newSubtodo;
	}
}

export default CreateSubtodoService;
