import request from 'supertest';
import { app } from '../index';
import { prismaClient } from '../database/prismaClient';

const req = request(app);
const endpoint = '/api/v1/user/';

describe('/user', () => {
	afterEach(async () => {
		const userTest = await prismaClient.user.findFirst({
			where: { email: 'user@gmail.com' },
		});

		if (userTest) {
			await prismaClient.user.delete({
				where: { id: userTest.id },
			});
		}
	});

	describe('POST /user', () => {
		it('should create a new user', async () => {
			const response = await req.post(endpoint).send({
				email: 'user@gmail.com',
				password: '123456',
				name: 'User',
			});

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({
				id: expect.any(String),
				email: response.body.email,
				name: response.body.name,
				createdAt: expect.any(String),
			});
		});

		it('should throw error if email is already in use', async () => {
			const response = await req.post(endpoint).send({
				email: 'test@test.com',
				password: '123',
				name: 'Test',
			});

			expect(response.status).toBe(400);
			expect(response.body).toStrictEqual({
				message: 'Email already in use',
				status: 400,
			});
		});
	});

	describe('PUT /user', () => {
		it('should update user data', async () => {
			const createdUser = await req.post(endpoint).send({
				email: 'user@gmail.com',
				password: '123456',
				name: 'updatetest',
			});

			const updatedUser = await req
				.put(`${endpoint}${createdUser.body.id}`)
				.send({
					email: 'user@gmail.com',
					password: 'updatedpassword',
					name: 'User',
				});

			expect(updatedUser.status).toBe(200);
			expect(updatedUser.body).toStrictEqual({
				id: createdUser.body.id,
				email: updatedUser.body.email,
				name: updatedUser.body.name,
				createdAt: createdUser.body.createdAt,
			});
		});

		it('should throw error if user does not exist', async () => {
			const response = await req.put(`${endpoint}123`).send({
				email: 'invalid-user',
			});

			expect(response.status).toBe(404);
			expect(response.body).toStrictEqual({
				message: 'User not found',
				status: 404,
			});
		});

		it('should throw error if email is already in use', async () => {
			const createdUser = await req.post(endpoint).send({
				email: 'user@gmail.com',
				password: '123456',
				name: 'updatetest',
			});

			const updatedUser = await req
				.put(`${endpoint}${createdUser.body.id}`)
				.send({
					email: 'test@test.com',
					password: 'updatedpassword',
					name: 'User',
				});

			expect(updatedUser.status).toBe(400);
			expect(updatedUser.body).toStrictEqual({
				message: 'Email already in use',
				status: 400,
			});
		});
	});
});
