import { Todo } from '@prisma/client';
import { prismaClient } from 'database/prismaClient';
import { ICreateTodoDTO, ITodoRepository } from './ITodoRepository';

class TodoRepository implements ITodoRepository {
	findByUserId(userId: string): Promise<Todo[]> {
		return prismaClient.todo.findMany({
			where: { userId },
			include: { subtodos: true },
		});
	}

	create(todo: ICreateTodoDTO): Promise<Todo> {
		return prismaClient.todo.create({
			data: todo,
		});
	}

	deleteById(id: string): void {
		prismaClient.todo.delete({
			where: { id },
		});
	}

	findById(id: string): Promise<Todo> {
		return prismaClient.todo.findUnique({
			where: { id },
		});
	}

	updateById(id: string, todo: Partial<Todo>): Promise<Todo> {
		return prismaClient.todo.update({
			where: { id },
			data: todo,
		});
	}
}

export default TodoRepository;
