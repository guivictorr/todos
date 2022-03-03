import request from 'supertest';
import { app } from '../index';

describe('/todos', () => {
	describe('GET /todos ', () => {
		it('should return all todos', () => {
			request(app)
				.get('/api/v1/todos')
				.expect(200);
		});
	});

	describe('POST /todos', () => {
		it('should create todo', async () => {
			const response = await request(app)
				.post('/api/v1/todos')
				.send({ title: 'todo title', description: 'todo description' });
        
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				id: expect.any(String),
				title: 'todo title',
				description: 'todo description',
				createdAt: expect.any(String),
			});
		});

		it('should not create todo with invalid title', async () => {
			const response = await request(app)
				.post('/api/v1/todos')
				.send({ title: '', description: 'todo description' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400
			});
		});

		it('should not create todo with invalid description', async () => {
			const response = await request(app)
				.post('/api/v1/todos')
				.send({ title: 'title', description: '' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400
			});
		});

		it('should not create todo with title length greater than 45 characters', async () => {
			const response = await request(app)
				.post('/api/v1/todos')
				.send({ title: 't'.repeat(46), description: 'description' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'title should be less than 45 characters',
				status: 400
			});
		});

		it('should not create todo with description length greater than 150 characters', async () => {
			const response = await request(app)
				.post('/api/v1/todos')
				.send({ title: 'title', description: 'd'.repeat(151) });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'description should be less than 150 characters',
				status: 400
			});
		});
	});

	describe('UPDATE /todos', () => {
		it('should update todo', async () => {
			const { body } = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app)
				.put(`/api/v1/todos/${body.id}`)
				.send({ title: 'updated title', description: 'updated description' });
      
			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				id: body.id,
				title: 'updated title',
				description: 'updated description',
				createdAt: body.createdAt,
			});
		});

		it('should return 404 if todo is not found', async () => {
			const response = await request(app)
				.put('/api/v1/todos/1')
				.send({ title: 'title', description: 'updated description' });
      
			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				message: 'Todo not found',
				status: 404
			});
		});


		it('should not update todo with invalid title', async () => {
			const { body } = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app)
				.put(`/api/v1/todos/${body.id}`)
				.send({ title: '', description: 'updated description' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400
			});
		});

		it('should not update todo with invalid description', async () => {
			const createdTodo = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app)
				.put(`/api/v1/todos/${createdTodo.body.id}`)
				.send({ title: 'title', description: '' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'Title and description are required',
				status: 400
			});
		});

		it('should not update todo with title length greater than 45 characters', async () => {
			const { body } = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app)
				.put(`/api/v1/todos/${body.id}`)
				.send({ title: 't'.repeat(46), description: 'description' });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'title should be less than 45 characters',
				status: 400
			});
		});

		it('should not update todo with description length greater than 150 characters', async () => {
			const { body } = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app)
				.put(`/api/v1/todos/${body.id}`)
				.send({ title: 'title', description: 'd'.repeat(151) });
      
			expect(response.status).toEqual(400);
			expect(response.body).toEqual({
				message: 'description should be less than 150 characters',
				status: 400
			});
		});
	});

	describe('DELETE /todos', () => {
		it('should delete todo', async () => {
			const { body } = await request(app).post('/api/v1/todos').send({ title: 'todo title', description: 'todo description' });

			const response = await request(app).delete(`/api/v1/todos/${body.id}`);

			expect(response.status).toEqual(200);
			expect(response.body).toEqual({
				message: 'Todo deleted successfully',
			});
		});

		it('should return 404 if todo is not found', async () => {
			const response = await request(app).delete('/api/v1/todos/1');
  
			expect(response.status).toEqual(404);
			expect(response.body).toEqual({
				message: 'Todo not found',
				status: 404
			});
		});
	});
});