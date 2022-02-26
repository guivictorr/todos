import express from 'express';
import TodoController from './controller/TodoController';

const PORT = process.env.PORT || 3000;
const todoController = new TodoController();

const app = express();
app.use(express.json());


app.get('/todos', todoController.index);
app.post('/todos', todoController.create);
app.put('/todos', todoController.update);
app.delete('/todos', todoController.delete);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

