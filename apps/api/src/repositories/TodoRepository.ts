import { Todo } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export interface ITodoRepository {
	create(todo: Omit<Todo, 'createdAt' | 'id'>): Promise<Todo>;
	deleteById(id: string): Promise<void>;
	findById(id: string): Promise<Todo | null>;
	findByUserId(userId: string): Promise<Todo[]>;
	updateById(
		id: string,
		todo: Pick<Todo, 'title' | 'description'>,
	): Promise<Todo>;
}

class TodoRepository implements ITodoRepository {
	findByUserId(userId: string): Promise<Todo[]> {
		return prismaClient.todo.findMany({
			where: { userId },
			include: { subtodos: true },
		});
	}

	async create(todo: Omit<Todo, 'createdAt' | 'id'>): Promise<Todo> {
		return await prismaClient.todo.create({
			data: todo,
		});
	}
	async deleteById(id: string): Promise<void> {
		await prismaClient.todo.delete({
			where: { id },
		});
	}
	async findById(id: string): Promise<Todo | null> {
		return await prismaClient.todo.findUnique({
			where: { id },
		});
	}
	async updateById(
		id: string,
		todo: Pick<Todo, 'title' | 'description'>,
	): Promise<Todo> {
		return await prismaClient.todo.update({
			where: { id },
			data: todo,
		});
	}
}

export default TodoRepository;
