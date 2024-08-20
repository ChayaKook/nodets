// userController.test.ts

import request from 'supertest';
import app from '../app';
import { User } from '../../src/db/schemas/user.schema';

import log4js from 'log4js';
log4js.configure('./log4js.json');
const logger = log4js.getLogger();


describe('User API', () => {
    let token: string = ""
    let userTestId: string = ""
    let userTest: User | any

    beforeAll(async () => {
        try {
            //get token for all tests
            token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMzOGViNzcxYjk5NzQzM2JjM2UwYzQiLCJ1c2VyTmFtZSI6ImJhdGkiLCJlbWFpbCI6ImJAYiIsImlhdCI6MTcyNDE2NjA5OCwiZXhwIjoxNzI0MTc2ODk4fQ.lMGbYGJtO3xLW9EoN_PhwKfoS-haRKYsoBGweiZuN9g"
            // logger.info("before all")

            // const user = {
            //     userName: "test",
            //     email: 't@t',
            //     password: 'ttt',
            // };
            // const newUser = await request(app).post('/users/').send(user);
            // logger.info("newUser: " + JSON.stringify((newUser as any)));

            // userTest = (newUser as any).req.data
            // userTestId = userTest._id!;
            // const response = await request(app).post('/auth/').send({ "email": userTest!.email, "password": userTest.password });

            // token = response.body.token;

            jest.clearAllMocks();
        } catch (err) {
            logger.error("beforeAll error: " + err);
            return false

        }
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        // const newUser = await request(app).delete(`/users/${userTestId}`)
        // logger.info("User deleted")
    });

    it('GET /users/', async () => {

        const response = await request(app)
            .get('/users/')
            .set('Authorization', `Bearer ${token}`);
        expect(response).toHaveProperty('status', 200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Rest of your tests...
});

// describe('User API', async () => {
//     let userId: string;

//     const getToken = async () => {
//         const user: User = {
//             username: 'bati',
//             email: 'b@b',
//             password: 'bbb',
//         };

//         const response = await request(app).post('/api/auth').send(user);
//         return response.body.token;
//     };

//     const token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmMzOGViNzcxYjk5NzQzM2JjM2UwYzQiLCJ1c2VyTmFtZSI6ImJhdGkiLCJlbWFpbCI6ImJAYiIsImlhdCI6MTcyNDE1MzQxNiwiZXhwIjoxNzI0MTY0MjE2fQ.EQX4qUCkz0z9ylviSPTyMXmcwweleAoAEA9BvBFPNlk"


//     beforeAll(async () => {
//         jest.clearAllMocks();
//     });

//     afterEach(() => {
//         jest.restoreAllMocks();
//     });

//     it('GET /api/users', async () => {
//         const response = await request(app)
//             .get('/api/users')
//             .set('Authorization', `Bearer ${token}`);
//         expect(response.status).toBeLessThan(401);
//         expect(response.status).toBeGreaterThanOrEqual(200);
//         expect(response.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//     });

//     // it('POST /api/users', async () => {
//     //     const user: User = {
//     //         username: 'shay',
//     //         email: 's@s',
//     //         password: 'sss',
//     //     };

//     //     const response = await request(app)
//     //         .post('/api/users')
//     //         .send(user)
//     //         .set('Authorization', `Bearer ${token}`);
//     //     expect(response.status).toBeLessThan(401);
//     //     expect(response.status).toBeGreaterThanOrEqual(200);
//     //     expect(response.status).toBe(201);
//     //     expect(response.body.username).toBe('shay');
//     //     expect(response.body.email).toBe('s@s');
//     // });

//     // it('PUT /api/users/:id', async () => {
//     //     const updatedUser: User = {
//     //         username: 'shay updated',
//     //         email: 's@s updated',
//     //         password: 'sss updated',
//     //     };

//     //     const response = await request(app)
//     //         .put(`/api/users/${userId}`)
//     //         .send(updatedUser)
//     //         .set('Authorization', `Bearer ${token}`);
//     //     expect(response.status).toBeLessThan(401);
//     //     expect(response.status).toBeGreaterThanOrEqual(200);
//     //     expect(response.status).toBe(200);
//     //     expect(response.body.username).toBe('shay updated');
//     //     expect(response.body.email).toBe('s@s updated');
//     // });

//     // it('DELETE /api/users/:id', async () => {
//     //     const response = await request(app)
//     //         .delete(`/api/users/${userId}`)
//     //         .set('Authorization', `Bearer ${token}`);
//     //     expect(response.status).toBeLessThan(401);
//     //     expect(response.status).toBeGreaterThanOrEqual(200);
//     //     expect(response.status).toBe(204);
//     // });

//     // beforeAll(async () => {
//     //     const user: User = {
//     //         username: 'bati',
//     //         email: 'b@b',
//     //         password: 'bbb',
//     //     };

//     //     const response = await request(app).post('/api/users').send(user);
//     //     userId = response.body._id;
//     // });

//     // afterAll(async () => {
//     //     await request(app).delete(`/api/users/${userId}`);
//     // });

//     // describe('GET /api/users/:id', () => {
//     //     it('returns a user by ID', async () => {
//     //         const response = await request(app).get(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
//     //         if (response.status === 401 || response.status === 403) {
//     //             return;
//     //         }
//     //         expect(response.status).toBeLessThan(401);
//     //         expect(response.status).toBeGreaterThanOrEqual(200);
//     //         expect(response.status).toBe(200);
//     //         expect(response.body._id).toBe(userId);
//     //         expect(response.body.username).toBe('chani');
//     //         expect(response.body.name).toBe('chani');
//     //         expect(response.body.email).toBe('c@c');
//     //     });
//     // });

//     // describe('GET /api/users', () => {
//     //     it('returns all users', async () => {
//     //         const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
//     //         if (response.status === 401 || response.status === 403) {
//     //             return;
//     //         }
//     //         expect(response.status).toBeLessThan(401);
//     //         expect(response.status).toBeGreaterThanOrEqual(200);
//     //         expect(response.status).toBe(200);
//     //         expect(Array.isArray(response.body)).toBe(true);
//     //     });
//     // });

//     // describe('POST /api/users', () => {
//     //     it('creates a new user', async () => {
//     //         const user: User = {
//     //             username: 'shay',
//     //             email: 's@s',
//     //             password: 'sss',
//     //         };

//     //         const response = await request(app).post('/api/users').send(user).set('Authorization', `Bearer ${token}`);
//     //         if (response.status === 401 || response.status === 403) {
//     //             return;
//     //         }
//     //         expect(response.status).toBeLessThan(401);
//     //         expect(response.status).toBeGreaterThanOrEqual(200);
//     //         expect(response.status).toBe(201);
//     //         expect(response.body.username).toBe('shay');
//     //         expect(response.body.email).toBe('s@s');
//     //     });
//     // });

//     // describe('PUT /api/users/:id', () => {
//     //     it('updates a user by ID', async () => {
//     //         const updatedUser: User = {
//     //             username: 'shay updated',
//     //             email: 's@s updated',
//     //             password: 'sss updated',
//     //         };

//     //         const response = await request(app).put(`/api/users/${userId}`).send(updatedUser).set('Authorization', `Bearer ${token}`);
//     //         if (response.status === 401 || response.status === 403) {
//     //             return;
//     //         }
//     //         expect(response.status).toBeLessThan(401);
//     //         expect(response.status).toBeGreaterThanOrEqual(200);
//     //         expect(response.status).toBe(200);
//     //         expect(response.body.username).toBe('shay updated');
//     //         expect(response.body.email).toBe('s@s updated');
//     //     });
//     // });

//     // describe('DELETE /api/users/:id', () => {
//     //     it('deletes a user by ID', async () => {
//     //         const response = await request(app).delete(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
//     //         if (response.status === 401 || response.status === 403) {
//     //             return;
//     //         }
//     //         expect(response.status).toBeLessThan(401);
//     //         expect(response.status).toBeGreaterThanOrEqual(200);
//     //         expect(response.status).toBe(204);
//     //     });
//     // });
// });




