import { Todo } from '@prisma/client';
import { ITodoRepository } from '../repositories/TodoRepository';

class CreateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: Omit<Todo, 'id' | 'createdAt'>) {
		const createdTodo = this.todoRepository.create(todo);

		return createdTodo;
	}
}

export default CreateTodoService;
