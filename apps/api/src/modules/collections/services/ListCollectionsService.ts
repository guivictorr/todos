import { Collection } from '@prisma/client';
import { ICollectionRepository } from '../repository/ICollectionRepository';

class ListCollectionsService {
	constructor(private collectionRepository: ICollectionRepository) {}

	async execute(userId: string): Promise<Collection[]> {
		return this.collectionRepository.findByUserId(userId);
	}
}

export default ListCollectionsService;
