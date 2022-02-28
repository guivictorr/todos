import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';
import CreateTodoService from '../services/CreateTodoService';
import DeleteTodoService from '../services/DeleteTodoService';
import UpdateTodoService from '../services/UpdateTodoService';

class TodoController {
	async index(req: Request, res: Response) {
		const todos = await prismaClient.todo.findMany();
		res.send(todos);
	}

	async create(req: Request, res: Response) {
		const { title, description } = req.body;
		
		const createTodoService = new CreateTodoService();
		const todo = await createTodoService.execute({ title, description });

		res.send(todo);
	}

	async update(req: Request, res: Response) {
		const { title, description, id } = req.body;

		const updateTodoService = new UpdateTodoService();
		const todo = await updateTodoService.execute(id, { title, description });

		res.send(todo);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.body;

		const deleteTodoService = new DeleteTodoService();
		const deletedTodo = await deleteTodoService.execute(id);
	
		res.send(deletedTodo);
	}
}

export default TodoController;