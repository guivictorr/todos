import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { prismaClient } from 'database/prismaClient';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../index';

const req = request(app);
const endpoint = `${process.env.API_PREFIX}/collections`;

describe('/collections', () => {
	const session: Partial<{
		token: string;
		user: User;
	}> = {};

	beforeAll(async () => {
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

		await prismaClient.collection.createMany({
			data: [
				{
					name: 'School',
					createdAt: new Date().toISOString(),
					id: randomUUID(),
					color: '#ff0000',
					userId,
				},
				{
					name: 'Work',
					createdAt: new Date().toISOString(),
					id: randomUUID(),
					color: '#321ff1',
					userId,
				},
			],
		});
	});

	describe('GET /collections', () => {
		it('should list collections', async () => {
			const collections = await req
				.get(endpoint)
				.set('Authorization', `Bearer ${session.token}`);

			expect(collections.status).toBe(200);
			expect(collections.body).toStrictEqual([
				{
					id: expect.any(String),
					createdAt: expect.any(String),
					name: 'School',
					color: expect.any(String),
					todos: [],
					userId: session.user.id,
				},
				{
					id: expect.any(String),
					createdAt: expect.any(String),
					name: 'Work',
					color: expect.any(String),
					todos: [],
					userId: session.user.id,
				},
			]);
		});
	});
});
