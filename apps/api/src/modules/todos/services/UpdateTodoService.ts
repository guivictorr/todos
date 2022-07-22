import { Todo } from '@prisma/client';

import AppError from 'error/AppError';
import { ITodoRepository } from '../repository/ITodoRepository';

class UpdateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: string, todo: Partial<Todo>) {
		const verifyTodo = await this.todoRepository.findById(id);

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		return this.todoRepository.updateById(id, todo);
	}
}

export default UpdateTodoService;
