import { Request, Response } from 'express';
import { prisma } from '../database/prismaClient';
class TodoController {
	async index(req: Request, res: Response) {
		const todos = await prisma.todo.findMany();
		res.send(todos);
	}

	async create(req: Request, res: Response) {
		const { title, description } = req.body;
		const todo = await prisma.todo.create({
			data: {
				title,
				description
			}
		});
		res.send(todo);
	}

	async update(req: Request, res: Response) {
		const { title, description, id } = req.body;

		const todo = await prisma.todo.update({
			where: { id },
			data: {
				title,
				description
			}
		});

		res.send(todo);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.body;
		const todo = await prisma.todo.delete({
			where: { id }
		});

		res.send(todo);
	}
}

export default TodoController;