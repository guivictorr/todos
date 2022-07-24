import { Request, Response } from 'express';
import CollectionRepository from './repository/CollectionRepository';
import ListCollectionsService from './services/ListCollectionsService';

const collectionRepository = new CollectionRepository();

class CollectionController {
	async index(req: Request, res: Response) {
		const { id } = res.locals.user;
		const listCollectionsService = new ListCollectionsService(
			collectionRepository,
		);

		const collections = await listCollectionsService.execute(id);

		res.send(collections);
	}
}

export default CollectionController;
