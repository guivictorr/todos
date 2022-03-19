import { Todo } from '@prisma/client';

import AppError from 'error/AppError';
import { ITodoRepository } from 'repositories/TodoRepository';

class UpdateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: string, todo: Pick<Todo, 'title' | 'description'>) {
		if (todo.title.length > 45) {
			throw new AppError('title should be less than 45 characters', 400);
		}

		if (todo.description.length > 150) {
			throw new AppError('description should be less than 150 characters', 400);
		}

		if (!todo.title || !todo.description) {
			throw new AppError('Title and description are required', 400);
		}

		const verifyTodo = await this.todoRepository.findById(id);

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		const updatedTodo = await this.todoRepository.updateById(id, todo);

		return updatedTodo;
	}
}

export default UpdateTodoService;
