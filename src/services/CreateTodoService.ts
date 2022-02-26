import { ITodoRepository } from '../repositories/ITodoRepository';
import { Todo } from '../repositories/TodoRepository';

class CreateTodoService {
	private todoRepository: ITodoRepository;

	constructor(todoRepository: ITodoRepository) {
		this.todoRepository = todoRepository;
	}

	async execute({description, title}: Omit<Todo, 'id'>) {
		const todo = await this.todoRepository.create({
			description,
			title
		});

		return todo;
	}
}

export default CreateTodoService;