import request from 'supertest';
import { app } from '../index';

const req = request(app);
const endpoint = `${process.env.API_PREFIX}/user`;

describe('/user', () => {
	describe('POST /user', () => {
		it('should create a new user', async () => {
			const response = await req.post(endpoint).send({
				email: 'user1@gmail.com',
				password: '123',
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
	});

	describe('PUT /user', () => {
		it('should update user data', async () => {
			const createdUser = await req.post(endpoint).send({
				email: 'user2@gmail.com',
				password: '123456',
				name: 'updatetest',
			});

			const updatedUser = await req
				.put(`${endpoint}/${createdUser.body.id}`)
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
			const response = await req.put(`${endpoint}/123`).send({
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
				email: 'user3@gmail.com',
				password: '123456',
				name: 'updatetest',
			});

			await req.post(endpoint).send({
				email: 'user4@gmail.com',
				password: '123456',
				name: 'updatetest',
			});

			const updatedUser = await req
				.put(`${endpoint}/${createdUser.body.id}`)
				.send({
					email: 'user4@gmail.com',
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
