import { Subtodo } from '@prisma/client';
import { prismaClient } from 'database/prismaClient';
import { ICreateSubtodoDTO, ISubtodoRepository } from './ISubtodoRepository';

export class SubtodoRepository implements ISubtodoRepository {
	update(id: string, subtodo: Partial<Subtodo>): Promise<Subtodo> {
		return prismaClient.subtodo.update({
			where: {
				id,
			},
			data: subtodo,
		});
	}

	delete(id: string): void {
		prismaClient.subtodo.delete({
			where: {
				id,
			},
		});
	}

	findById(id: string): Promise<Subtodo> {
		return prismaClient.subtodo.findUnique({
			where: {
				id,
			},
		});
	}

	create(subtodo: ICreateSubtodoDTO): Promise<Subtodo> {
		return prismaClient.subtodo.create({
			data: subtodo,
		});
	}
}
