import { Collection } from '@prisma/client';

export interface ICollectionRepository {
	findByUserId(userId: string): Promise<Collection[]>;
}
