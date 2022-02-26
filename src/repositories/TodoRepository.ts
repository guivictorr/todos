import { ITodoRepository } from './ITodoRepository';
import todos from '../data/data.json';

export interface Todo {
  id: string;
  title: string;
  description: string;
}

class TodoRepository implements ITodoRepository {
	private todoRepository: Todo[];

	constructor() {
		this.todoRepository = todos;
	}

	findAll(): Promise<Todo[]> {
		return Promise.resolve(this.todoRepository);
	}
  
	findById(id: string): Promise<Todo | undefined> {
		const todo = this.todoRepository.find(todo => todo.id === id);
		return Promise.resolve(todo);
	}

	create(todo: Omit<Todo, 'id'>): Promise<Todo> {
		const newTodo: Todo = {
			id: String(Date.now()),
			...todo,
		};

		this.todoRepository.push(newTodo);
		return Promise.resolve(newTodo);
	}

	async update(id: string, todo: Todo): Promise<Todo> {
		const selectedTodo = await this.findById(id);
		const selectedTodoIndex = this.todoRepository.findIndex(todo => todo.id === id);

		const updatedTodo = {
			...selectedTodo,
			...todo
		};

		this.todoRepository[selectedTodoIndex] = updatedTodo;

		return Promise.resolve(updatedTodo);
	}

	delete(id: string): void {
		const todoIndex = this.todoRepository.findIndex(todo => todo.id === id);
		this.todoRepository.splice(todoIndex, 1);
	} 
}

export default TodoRepository;