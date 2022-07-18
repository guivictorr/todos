import { Subtodo } from '@prisma/client';
import { prismaClient } from '../database/prismaClient';

export interface ISubtodoRepository {
	update(id: string, subtodo: Partial<Subtodo>): Promise<Subtodo>;
	create(todo: Omit<Subtodo, 'id' | 'createdAt'>): Promise<Subtodo>;
	findById(id: string): Promise<Subtodo | undefined>;
	delete(id: string): Promise<void>;
}

export class SubtodoRepository implements ISubtodoRepository {
	async update(
		id: string,
		subtodo: Pick<Subtodo, 'title' | 'description'>,
	): Promise<Subtodo> {
		return await prismaClient.subtodo.update({
			where: {
				id,
			},
			data: subtodo,
		});
	}

	async delete(id: string): Promise<void> {
		await prismaClient.subtodo.delete({
			where: {
				id,
			},
		});
	}

	async findById(id: string): Promise<Subtodo | undefined> {
		return await prismaClient.subtodo.findUnique({
			where: {
				id,
			},
		});
	}

	async create(subtodo: Omit<Subtodo, 'id' | 'createdAt'>): Promise<Subtodo> {
		return await prismaClient.subtodo.create({
			data: subtodo,
		});
	}
}
