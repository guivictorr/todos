import { User } from '@prisma/client';

export type ICreateUserDTO = Pick<User, 'email' | 'name' | 'password'>;

export interface IUserRepository {
	create(user: ICreateUserDTO): Promise<Omit<User, 'password'>>;
	findByEmail(email: string): Promise<User | undefined>;
	findById(id: string): Promise<User>;
	update(id: string, user: Partial<User>): Promise<Omit<User, 'password'>>;
}
