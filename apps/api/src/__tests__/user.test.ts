import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { prismaClient } from 'database/prismaClient';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../index';

const req = request(app);
const endpoint = `${process.env.API_PREFIX}/user`;

describe('/user', () => {
	describe('POST /user', () => {
		it('should create a new user', async () => {
			const response = await req.post(endpoint).send({
				email: 'user1@gmail.com',
				password: '12345678',
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

		it('should validate email', async () => {
			const response = await req.post(endpoint).send({
				email: 'invalid-email',
				password: '12345678',
				name: 'User',
			});

			expect(response.status).toBe(422);
			expect(response.body).toStrictEqual({
				message: 'Invalid email',
				status: 422,
			});
		});

		it('should validate password', async () => {
			const response = await req.post(endpoint).send({
				email: 'test@test.com',
				password: '123',
				name: 'User',
			});

			expect(response.status).toBe(422);
			expect(response.body).toStrictEqual({
				message: 'Password must be at least 8 characters',
				status: 422,
			});
		});

		it('should throw error if email is not passed', async () => {
			const response = await req.post(endpoint).send({
				password: '123',
				name: 'User',
			});

			expect(response.status).toBe(422);
			expect(response.body).toStrictEqual({
				message: 'email is required',
				status: 422,
			});
		});

		it('should throw error if name is not passed', async () => {
			const response = await req.post(endpoint).send({
				email: 'test@gmail.com',
				password: '12345678',
			});

			expect(response.status).toBe(422);
			expect(response.body).toStrictEqual({
				message: 'name is required',
				status: 422,
			});
		});

		it('should throw error if password is not passed', async () => {
			const response = await req.post(endpoint).send({
				email: 'test@gmail.com',
				name: 'User',
			});

			expect(response.status).toBe(422);
			expect(response.body).toStrictEqual({
				message: 'password is required',
				status: 422,
			});
		});
	});

	describe('PUT /user', () => {
		const session: Partial<{
			token: string;
			user: User;
		}> = {};

		beforeEach(async () => {
			const userId = randomUUID();
			session.token = sign({}, String(process.env.APP_SECRET), {
				subject: userId,
			});
			session.user = await prismaClient.user.create({
				data: {
					email: 'test@test.com',
					password: 'test',
					name: 'Test',
					id: userId,
				},
			});
		});

		afterEach(async () => {
			await prismaClient.user.delete({
				where: {
					id: session.user.id,
				},
			});
		});

		it('should update user data', async () => {
			const updatedUser = await req
				.put(endpoint)
				.set('Authorization', `Bearer ${session.token}`)
				.send({
					email: 'updatetest2@test.com',
					password: '12345678',
					name: 'Test',
				});

			expect(updatedUser.status).toBe(200);
			expect(updatedUser.body).toStrictEqual({
				id: session.user.id,
				email: updatedUser.body.email,
				name: updatedUser.body.name,
				createdAt: updatedUser.body.createdAt,
			});
		});

		it('should throw error if email is already in use', async () => {
			const secondUser = await req.post(endpoint).send({
				email: 'seconduser@gmail.com',
				password: '12345678',
				name: 'updatetest',
			});

			const updatedUser = await req
				.put(endpoint)
				.set('Authorization', `Bearer ${session.token}`)
				.send({
					email: secondUser.body.email,
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
