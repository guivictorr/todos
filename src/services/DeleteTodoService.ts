import { prismaClient } from 'database/prismaClient';
import AppError from 'error/AppError';

class DeleteTodoService {
	async execute(id: string) {
		const verifyTodo = await prismaClient.todo.findUnique({
			where: { id },
		});

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		await prismaClient.todo.delete({
			where: { id },
		});
	}
}

export default DeleteTodoService;
