import { Subtodo } from '@prisma/client';
import AppError from '../error/AppError';
import { ISubtodoRepository } from '../repositories/ISubtodoRepository';

export class UpdateSubtodoService {
	constructor(private subtodoRepository: ISubtodoRepository) {}

	async execute(id: string, subtodo: Partial<Subtodo>) {
		const subtodoFound = await this.subtodoRepository.findById(id);

		if (!subtodoFound) {
			throw new AppError('Subtodo not found', 404);
		}

		return this.subtodoRepository.update(id, subtodo);
	}
}
