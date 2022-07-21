import { Todo } from '@prisma/client';

export type ICreateTodoDTO = Pick<Todo, 'title' | 'description' | 'userId'>;

export interface ITodoRepository {
	create(todo: ICreateTodoDTO): Promise<Todo>;
	deleteById(id: string): void;
	findById(id: string): Promise<Todo>;
	findByUserId(userId: string): Promise<Todo[]>;
	updateById(id: string, todo: Partial<Todo>): Promise<Todo>;
}
