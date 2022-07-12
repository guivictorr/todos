import request from 'supertest';
import { prismaClient } from '../database/prismaClient';
import { app } from '../index';

const req = request(app);
const endpoint = `${process.env.API_PREFIX}/subtodos`;

describe('/subtodos', () => {
	let parentTodoId: string;

	beforeAll(async () => {
		const user = await prismaClient.user.create({
			data: {
				email: 'test@gmail.com',
				name: 'Test',
				password: 'test',
				id: 'test-user-id',
			},
		});

		const parentTodo = await prismaClient.todo.create({
			data: {
				title: 'parent todo title',
				description: 'parent todo description',
				id: '2',
				userId: user.id,
			},
		});

		parentTodoId = parentTodo.id;
	});

	describe('POST /subtodos', () => {
		it('should create a subtodo correctly', async () => {
			const subtodo = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({
					title: 'subtodo title',
					description: 'subtodo description',
				});

			expect(subtodo.status).toBe(200);
			expect(subtodo.body).toEqual({
				id: expect.any(String),
				title: subtodo.body.title,
				description: subtodo.body.description,
				parentTodoId,
				createdAt: subtodo.body.createdAt,
			});
		});

		it('should not create if parent does not exist', async () => {
			const subtodo = await req
				.post(`${endpoint}/invalid-parent-id`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({
					title: 'subtodo title',
					description: 'subtodo description',
				});

			expect(subtodo.status).toBe(404);
			expect(subtodo.body).toEqual({
				message: 'Parent todo not found',
				status: 404,
			});
		});

		it('should not create subtodo with invalid title', async () => {
			const response = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: '', description: 'todo description' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400,
			});
		});

		it('should not create subtodo with invalid description', async () => {
			const response = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 'title', description: '' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400,
			});
		});

		it('should not create subtodo with title length greater than 45 characters', async () => {
			const response = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 't'.repeat(46), description: 'description' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'title should be less than 45 characters',
				status: 400,
			});
		});

		it('should not create subtodo with description length greater than 150 characters', async () => {
			const response = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 'title', description: 'd'.repeat(151) });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'description should be less than 150 characters',
				status: 400,
			});
		});
	});

	describe('DELETE /subtodos', () => {
		it('should delete subtodo correctly', async () => {
			const subtodo = await req
				.post(`${endpoint}/${parentTodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({
					title: 'subtodo title',
					description: 'subtodo description',
				});

			const deletedTodo = await req
				.delete(`${endpoint}/${subtodo.body.id}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`);

			expect(deletedTodo.status).toBe(200);

			expect(deletedTodo.body).toEqual({
				message: 'Subtodo deleted successfully',
				status: 200,
			});
		});

		it('should throw error if subtodo does not exist', async () => {
			const deletedTodo = await req
				.delete(`${endpoint}/invalid-id`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`);

			expect(deletedTodo.status).toBe(404);

			expect(deletedTodo.body).toEqual({
				message: 'Subtodo not found',
				status: 404,
			});
		});
	});

	describe('PUT /subtodos', () => {
		let subtodoId: string;

		beforeAll(async () => {
			const subtodo = await prismaClient.subtodo.create({
				data: {
					title: 'subtodo title',
					description: 'subtodo description',
					id: 'subtodoid',
					parentTodoId: parentTodoId,
				},
			});

			subtodoId = subtodo.id;
		});

		it('should update a subtodo correctly', async () => {
			const editedSubtodo = await req
				.put(`${endpoint}/${subtodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({
					title: 'edited subtodo title',
					description: 'edited subtodo description',
				});

			expect(editedSubtodo.status).toBe(200);
			expect(editedSubtodo.body).toEqual({
				id: editedSubtodo.body.id,
				title: editedSubtodo.body.title,
				description: editedSubtodo.body.description,
				parentTodoId,
				createdAt: editedSubtodo.body.createdAt,
			});
		});

		it('should not update subtodo if does not exist', async () => {
			const subtodo = await req
				.put(`${endpoint}/invalid-parent-id`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({
					title: 'subtodo title',
					description: 'subtodo description',
				});

			expect(subtodo.status).toBe(404);
			expect(subtodo.body).toEqual({
				message: 'Subtodo not found',
				status: 404,
			});
		});

		it('should not update subtodo with invalid title', async () => {
			const response = await req
				.put(`${endpoint}/${subtodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: '', description: 'todo description' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400,
			});
		});

		it('should not update subtodo with invalid description', async () => {
			const response = await req
				.put(`${endpoint}/${subtodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 'title', description: '' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400,
			});
		});

		it('should not update todo with title length greater than 45 characters', async () => {
			const response = await req
				.put(`${endpoint}/${subtodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 't'.repeat(46), description: 'description' });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'title should be less than 45 characters',
				status: 400,
			});
		});

		it('should not update todo with description length greater than 150 characters', async () => {
			const response = await req
				.put(`${endpoint}/${subtodoId}`)
				.set('Authorization', `Bearer ${process.env.JWT_TOKEN}`)
				.send({ title: 'title', description: 'd'.repeat(151) });

			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'description should be less than 150 characters',
				status: 400,
			});
		});
	});
});
