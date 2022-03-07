import AppError from 'error/AppError';
import { ITodoRepository } from 'repositories/TodoRepository';

class DeleteTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(id: string) {
		const verifyTodo = await this.todoRepository.findById(id);

		if (!verifyTodo) {
			throw new AppError('Todo not found', 404);
		}

		await this.todoRepository.deleteById(id);
	}
}

export default DeleteTodoService;
