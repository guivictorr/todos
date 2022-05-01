import { prismaClient } from '../src/database/prismaClient';

beforeAll(async () => {
	const deleteUsers = prismaClient.user.deleteMany();
	const deleteTodos = prismaClient.todo.deleteMany();

	await prismaClient.$transaction([deleteUsers, deleteTodos]);

	await prismaClient.$disconnect();
});
