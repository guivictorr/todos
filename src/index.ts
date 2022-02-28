import 'express-async-errors';
import express from 'express';

import { catchError } from './middlewares/catchError';
import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);

app.use(catchError);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

