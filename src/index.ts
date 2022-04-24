import 'express-async-errors';
import express from 'express';

import { catchError } from '../src/middlewares/catchError';
import routes from './routes';

const PORT = process.env.PORT || 3000;

export const app = express();

app.use(express.json());
app.use(routes);

app.use(catchError);

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
