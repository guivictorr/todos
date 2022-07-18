import { Request, Response } from 'express';
import CreateTodoService from '../services/CreateTodoService';
import DeleteTodoService from '../services/DeleteTodoService';
import UpdateTodoService from '../services/UpdateTodoService';
import TodoRepository from '../repositories/TodoRepository';
import UserRepository from '../repositories/UserRepository';
import ListUserTodosService from '../services/ListUserTodosService';

class TodoController {
	async index(req: Request, res: Response) {
		const { userId } = req.params;

		const userRepository = new UserRepository();
		const todoRepository = new TodoRepository();

		const listTodosService = new ListUserTodosService(
			todoRepository,
			userRepository,
		);

		const todos = await listTodosService.execute(userId);

		res.send(todos);
	}

	async create(req: Request, res: Response) {
		const { title, description } = req.body;
		const { userId } = req.params;

		const todoRepository = new TodoRepository();
		const userRepository = new UserRepository();

		const createTodoService = new CreateTodoService(
			todoRepository,
			userRepository,
		);
		const todo = await createTodoService.execute({
			title,
			description,
			userId,
			completed: false,
		});

		res.send(todo);
	}

	async update(req: Request, res: Response) {
		const { title, description, completed } = req.body;
		const { id } = req.params;

		const todoRepository = new TodoRepository();

		const updateTodoService = new UpdateTodoService(todoRepository);
		const todo = await updateTodoService.execute(id, {
			title,
			description,
			completed,
		});

		res.send(todo);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const todoRepository = new TodoRepository();

		const deleteTodoService = new DeleteTodoService(todoRepository);
		await deleteTodoService.execute(id);

		res.status(200).send({ message: 'Todo deleted successfully' });
	}
}

export default TodoController;
