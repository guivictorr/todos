import { Subtodo } from '@prisma/client';

export type ICreateSubtodoDTO = Pick<
	Subtodo,
	'title' | 'description' | 'parentTodoId'
>;

export interface ISubtodoRepository {
	update(id: string, subtodo: Partial<Subtodo>): Promise<Subtodo>;
	create(todo: ICreateSubtodoDTO): Promise<Subtodo>;
	findById(id: string): Promise<Subtodo>;
	delete(id: string): void;
}
