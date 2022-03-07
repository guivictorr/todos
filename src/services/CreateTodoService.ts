import { Todo } from '@prisma/client';
import AppError from 'error/AppError';
import { ITodoRepository } from 'repositories/TodoRepository';

class CreateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: Omit<Todo, 'id' | 'createdAt'>) {
		if (todo.title.length > 45) {
			throw new AppError('title should be less than 45 characters', 400);
		}

		if (todo.description.length > 150) {
			throw new AppError('description should be less than 150 characters', 400);
		}

		if (!todo.title || !todo.description) {
			throw new AppError('Title and description are required', 400);
		}

		const createdTodo = this.todoRepository.create(todo);

		return createdTodo;
	}
}

export default CreateTodoService;
