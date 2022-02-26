import { ITodoRepository } from '../repositories/ITodoRepository';

class DeleteTodoService {
	private todoRepository: ITodoRepository;

	constructor(todoRepository: ITodoRepository) {
		this.todoRepository = todoRepository;
	}

	async execute(id: string) {
		this.todoRepository.delete(id);
	}
}

export default DeleteTodoService;