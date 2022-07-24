import { Router } from 'express';

import CollectionController from './CollectionController';
import authenticate from 'middlewares/auth';

const collectionController = new CollectionController();
const collectionRoutes = Router();

collectionRoutes.use(authenticate);

collectionRoutes.get('/', collectionController.index);

export default collectionRoutes;
