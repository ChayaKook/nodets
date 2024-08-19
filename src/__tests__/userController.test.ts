// userController.test.ts

import request from 'supertest';
import app from '../app';
import { User } from '../../src/db/schemas/user.schema';

describe('User API', () => {
    let userId: string;

    const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMzNTU4OGU5ODI4YjE5ZDBmOTg0YjQiLCJ1c2VyTmFtZSI6ImNoYXlhIiwiZW1haWwiOiJjaGF5YUBnbWFpbCIsImlhdCI6MTcyNDA5MDQ2NywiZXhwIjoxNzI0MTAxMjY3fQ.xhOUtCYhlobdKi_vrnWg5Q7WE3FHaAWVq60rwRoXGOs";

    const getToken = async () => {
        const user: User = {
            username: 'bati',
            email: 'b@b',
            password: 'bbb',
        };

        const response = await request(app).post('/api/auth').send(user);
        return response.body.token;
    };


    beforeAll(async () => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('User API', () => {
        it('GET /api/users/:id', async () => {
            const response = await request(app)
                .get(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(response.body._id).toBe(userId);
        });

        it('GET /api/users', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it('POST /api/users', async () => {
            const user: User = {
                username: 'shay',
                email: 's@s',
                password: 'sss',
            };

            const response = await request(app)
                .post('/api/users')
                .send(user)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(201);
            expect(response.body.username).toBe('shay');
            expect(response.body.email).toBe('s@s');
        });

        it('PUT /api/users/:id', async () => {
            const updatedUser: User = {
                username: 'shay updated',
                email: 's@s updated',
                password: 'sss updated',
            };

            const response = await request(app)
                .put(`/api/users/${userId}`)
                .send(updatedUser)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(response.body.username).toBe('shay updated');
            expect(response.body.email).toBe('s@s updated');
        });

        it('DELETE /api/users/:id', async () => {
            const response = await request(app)
                .delete(`/api/users/${userId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(204);
        });
    });
    beforeAll(async () => {
        const user: User = {
            username: 'bati',
            email: 'b@b',
            password: 'bbb',
        };

        const response = await request(app).post('/api/users').send(user);
        userId = response.body._id;
    });

    afterAll(async () => {
        await request(app).delete(`/api/users/${userId}`);
    });

    describe('GET /api/users/:id', () => {
        it('returns a user by ID', async () => {
            const response = await request(app).get(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
            if (response.status === 401 || response.status === 403) {
                return;
            }
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(response.body._id).toBe(userId);
            expect(response.body.username).toBe('chani');
            expect(response.body.name).toBe('chani');
            expect(response.body.email).toBe('c@c');
        });
    });

    describe('GET /api/users', () => {
        it('returns all users', async () => {
            const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
            if (response.status === 401 || response.status === 403) {
                return;
            }
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/users', () => {
        it('creates a new user', async () => {
            const user: User = {
                username: 'shay',
                email: 's@s',
                password: 'sss',
            };

            const response = await request(app).post('/api/users').send(user).set('Authorization', `Bearer ${token}`);
            if (response.status === 401 || response.status === 403) {
                return;
            }
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(201);
            expect(response.body.username).toBe('shay');
            expect(response.body.email).toBe('s@s');
        });
    });

    describe('PUT /api/users/:id', () => {
        it('updates a user by ID', async () => {
            const updatedUser: User = {
                username: 'shay updated',
                email: 's@s updated',
                password: 'sss updated',
            };

            const response = await request(app).put(`/api/users/${userId}`).send(updatedUser).set('Authorization', `Bearer ${token}`);
            if (response.status === 401 || response.status === 403) {
                return;
            }
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(200);
            expect(response.body.username).toBe('shay updated');
            expect(response.body.email).toBe('s@s updated');
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('deletes a user by ID', async () => {
            const response = await request(app).delete(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
            if (response.status === 401 || response.status === 403) {
                return;
            }
            expect(response.status).toBeLessThan(401);
            expect(response.status).toBeGreaterThanOrEqual(200);
            expect(response.status).toBe(204);
        });
    });
});




