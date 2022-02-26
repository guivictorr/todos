import { Todo } from './TodoRepository';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | undefined>;
  create(todo: Omit<Todo, 'id'>): Promise<Todo>;
  update(id: string, todo: Todo): Promise<Todo>;
  delete(id: string): void;
}