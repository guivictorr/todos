import { Collection } from '@prisma/client';
import { prismaClient } from 'database/prismaClient';
import { ICollectionRepository } from './ICollectionRepository';

class CollectionRepository implements ICollectionRepository {
	findByUserId(userId: string): Promise<Collection[]> {
		return prismaClient.collection.findMany({
			where: { userId },
			include: {
				todos: true,
			},
		});
	}
}

export default CollectionRepository;
