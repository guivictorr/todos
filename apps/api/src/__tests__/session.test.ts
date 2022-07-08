import request from 'supertest';
import { app } from '../index';

const req = request(app);
const endpoint = `${process.env.API_PREFIX}/session`;

describe('/session', () => {
	describe('POST /session', () => {
		it('should create a session', async () => {
			await req.post(`${process.env.API_PREFIX}/user`).send({
				email: 'sessiontest@test.com',
				password: '123456',
				name: 'Test',
			});

			const session = await req
				.post(endpoint)
				.send({ email: 'sessiontest@test.com', password: '123456' });
			expect(session.status).toBe(200);
			expect(session.body).toStrictEqual({
				token: expect.any(String),
				user: {
					id: expect.any(String),
					name: 'Test',
					email: 'sessiontest@test.com',
					createdAt: expect.any(String),
				},
			});
		});

		it('should not create a session with invalid email', async () => {
			const session = await req
				.post(endpoint)
				.send({ email: 'invald-email@invalid.com', password: 'test' });

			expect(session.status).toBe(401);
			expect(session.body).toStrictEqual({
				message: 'Invalid credentials',
				status: 401,
			});
		});

		it('should not create a session with invalid password', async () => {
			await req.post(endpoint).send({
				email: 'test@test.com',
				password: '123',
				name: 'Test',
			});

			const session = await req
				.post(endpoint)
				.send({ email: 'test@test.com', password: 'invalid-password' });

			expect(session.status).toBe(401);
			expect(session.body).toStrictEqual({
				message: 'Invalid credentials',
				status: 401,
			});
		});
	});
});
