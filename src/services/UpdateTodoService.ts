import { Todo } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

import AppError from '../error/AppError';

class UpdateTodoService {
	async execute(id: string, todo: Pick<Todo, 'title' | 'description'>) {
		if (!todo.title || !todo.description) {
			throw new AppError('Title and description are required', 400);
		}
		
		const verifyTodo = await prismaClient.todo.findUnique({
			where: { id }
		});
		
		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}
    
		const updatedTodo = await prismaClient.todo.update({
			where: { id },
			data: todo
		});
	
		return updatedTodo;
	}
}

export default UpdateTodoService;