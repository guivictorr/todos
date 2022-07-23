import { ITodoRepository } from '../repository/ITodoRepository';

class ListUserTodos {
	constructor(private todoRepository: ITodoRepository) {}

	async execute(userId: string) {
		return this.todoRepository.findByUserId(userId);
	}
}

export default ListUserTodos;
