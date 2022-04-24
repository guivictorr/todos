import request from 'supertest';

import { app } from '../src/index';

const req = request(app);

export async function loginUser() {
	const session = await req
		.post('/api/v1/session')
		.send({ email: 'test@test.com', password: '123' });

	return session.body;
}

export async function createUser() {
	await req.post('/api/v1/user').send({
		email: 'test@test.com',
		password: '123',
		name: 'Test',
	});
}
