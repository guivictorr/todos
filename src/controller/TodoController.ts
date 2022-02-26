import { Request, Response } from 'express';
import UpdateTodoService from '../services/UpdateTodoService';
import TodoRepository from '../repositories/TodoRepository';
import CreateTodoService from '../services/CreateTodoService';
import DeleteTodoService from '../services/DeleteTodoService';

class TodoController {
	async index(req: Request, res: Response) {
		const todoRepository = new TodoRepository();
		const todos = await todoRepository.findAll();
		
		res.send({ todos });
	}

	async create(req: Request, res: Response) {
		const { title, description } = req.body;
		const todoRepository = new TodoRepository();
		const createTodoService = new CreateTodoService(todoRepository);
	
		const todo = await createTodoService.execute({title, description});
		res.send({ todo });
	}

	async update(req: Request, res: Response) {
		const { title, description } = req.body;
		const { id } = req.query;
		const todoRepository = new TodoRepository();
		const createTodoService = new UpdateTodoService(todoRepository);
	
		const todo = await createTodoService.execute(`${id}`, { title, description });
		res.send({ todo });
	}

	async delete(req: Request, res: Response) {
		const { id } = req.query;
		const todoRepository = new TodoRepository();
		const deleteTodoService = new DeleteTodoService(todoRepository);
	
		deleteTodoService.execute(`${id}`);
		res.status(200).send();
	}
}

export default TodoController;