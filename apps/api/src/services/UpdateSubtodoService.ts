import { Subtodo } from '@prisma/client';
import AppError from '../error/AppError';
import { ISubtodoRepository } from '../repositories/SubtodoRepository';

export class UpdateSubtodoService {
	constructor(private subtodoRepository: ISubtodoRepository) {}

	async execute(id: string, subtodo: Pick<Subtodo, 'title' | 'description'>) {
		const subtodoFound = await this.subtodoRepository.findById(id);

		if (!subtodoFound) {
			throw new AppError('Subtodo not found', 404);
		}

		if (subtodo.title.length > 45) {
			throw new AppError('title should be less than 45 characters', 400);
		}

		if (subtodo.description.length > 150) {
			throw new AppError('description should be less than 150 characters', 400);
		}

		if (!subtodo.title || !subtodo.description) {
			throw new AppError('Title and description are required', 400);
		}

		return await this.subtodoRepository.update(id, subtodo);
	}
}
