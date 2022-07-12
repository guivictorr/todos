import AppError from '../error/AppError';
import { ISubtodoRepository } from '../repositories/SubtodoRepository';

export class DeleteSubtodoService {
	constructor(private subtodoRepository: ISubtodoRepository) {}

	async execute(id: string) {
		const subtodo = await this.subtodoRepository.findById(id);

		if (!subtodo) {
			throw new AppError('Subtodo not found', 404);
		}

		await this.subtodoRepository.delete(id);
	}
}
