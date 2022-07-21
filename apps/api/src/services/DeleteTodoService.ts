import AppError from '../error/AppError';
import { ITodoRepository } from '../repositories/ITodoRepository';

class DeleteTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: string) {
		const verifyTodo = await this.todoRepository.findById(id);

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		this.todoRepository.deleteById(id);
	}
}

export default DeleteTodoService;
