import { Todo } from '@prisma/client';

import AppError from '../error/AppError';
import { ITodoRepository } from '../repositories/TodoRepository';

class UpdateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: string, todo: Pick<Todo, 'title' | 'description'>) {
		const verifyTodo = await this.todoRepository.findById(id);

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		const updatedTodo = await this.todoRepository.updateById(id, todo);

		return updatedTodo;
	}
}

export default UpdateTodoService;
