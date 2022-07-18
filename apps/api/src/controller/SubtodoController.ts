import { Request, Response } from 'express';
import { SubtodoRepository } from '../repositories/SubtodoRepository';
import TodoRpository from '../repositories/TodoRepository';
import CreateSubtodoService from '../services/CreateSubtodoService';
import { DeleteSubtodoService } from '../services/DeleteSubtodoService';
import { UpdateSubtodoService } from '../services/UpdateSubtodoService';

export class SubtodoController {
	async create(req: Request, res: Response) {
		const { title, description } = req.body;
		const { parentTodoId } = req.params;

		const subtodoRepository = new SubtodoRepository();
		const todoRepository = new TodoRpository();
		const createSubtodoService = new CreateSubtodoService(
			subtodoRepository,
			todoRepository,
		);
		const subtodo = await createSubtodoService.execute({
			description,
			title,
			parentTodoId,
			completed: false,
		});

		res.send(subtodo);
	}

	async update(req: Request, res: Response) {
		const { title, description } = req.body;
		const { id } = req.params;

		const subtodoRepository = new SubtodoRepository();
		const updateSubtodoService = new UpdateSubtodoService(subtodoRepository);
		const subtodo = await updateSubtodoService.execute(id, {
			title,
			description,
		});

		res.send(subtodo);
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const subtodoRepository = new SubtodoRepository();
		const deleteSubtodoService = new DeleteSubtodoService(subtodoRepository);
		await deleteSubtodoService.execute(id);
		res
			.status(200)
			.send({ message: 'Subtodo deleted successfully', status: 200 });
	}
}
