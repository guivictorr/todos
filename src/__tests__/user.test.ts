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
