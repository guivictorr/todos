import express from 'express';
import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

