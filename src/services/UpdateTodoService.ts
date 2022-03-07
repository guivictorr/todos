import { Todo } from '@prisma/client';
import { prismaClient } from 'database/prismaClient';

import AppError from 'error/AppError';

class UpdateTodoService {
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

		const verifyTodo = await prismaClient.todo.findUnique({
			where: { id },
		});

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		const updatedTodo = await prismaClient.todo.update({
			where: { id },
			data: todo,
		});

		return updatedTodo;
	}
}

export default UpdateTodoService;
