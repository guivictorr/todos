import { Todo } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';
import AppError from '../error/AppError';

class CreateTodoService {
	async execute(todo: Pick<Todo, 'title' | 'description'>) {
		if (!todo.title || !todo.description) {
			throw new AppError('Title and description are required', 400);
		}

		const createdTodo = await prismaClient.todo.create({
			data: todo
		});
		return createdTodo;
	}
}

export default CreateTodoService;