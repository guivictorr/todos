import { prismaClient } from '../database/prismaClient';
import AppError from '../error/AppError';

class DeleteTodoService {
	async execute(id: string) {
		const verifyTodo = await prismaClient.todo.findUnique({
			where: { id }
		});
		
		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}
	
		const deletedTodo = await prismaClient.todo.delete({
			where: { id },
		});
	
		return deletedTodo;
	}
}

export default DeleteTodoService;