import { ICreateTodoDTO, ITodoRepository } from '../repository/ITodoRepository';

class CreateTodoService {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(todo: ICreateTodoDTO) {
		return this.todoRepository.create(todo);
	}
}

export default CreateTodoService;
