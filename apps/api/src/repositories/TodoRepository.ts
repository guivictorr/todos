import { Todo } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export interface ITodoRepository {
	create(todo: Omit<Todo, 'createdAt' | 'id'>): Promise<Todo>;
	deleteById(id: string): Promise<void>;
	findById(id: string): Promise<Todo | null>;
	updateById(
		id: string,
		todo: Pick<Todo, 'title' | 'description'>,
	): Promise<Todo>;
}

class TodoRpository implements ITodoRepository {
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

export default TodoRpository;
