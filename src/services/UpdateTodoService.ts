import { ITodoRepository } from '../repositories/ITodoRepository';
import { Todo } from '../repositories/TodoRepository';

class UpdateTodoService {
	private todoRepository: ITodoRepository;

	constructor(todoRepository: ITodoRepository) {
		this.todoRepository = todoRepository;
	}

	async execute(id: string, todo: Omit<Todo, 'id'>) {
		const selectedTodo = await this.todoRepository.findById(id);

		if (!selectedTodo) {
			throw new Error('Todo not found');
		}
    
		await this.todoRepository.update(id, {
			...selectedTodo,
			...todo
		});

		return todo;
	}
}

export default UpdateTodoService;