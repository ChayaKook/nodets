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
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM1MTQ1NDZhNDBhNDY5YTNjMGExNTUiLCJ1c2VyTmFtZSI6ImJhdGkiLCJlbWFpbCI6ImJAYiIsImlhdCI6MTcyNDE5MTg0NCwiZXhwIjoxNzI0MjAyNjQ0fQ.DJ62YY82O5wQ85F6MiuOqjvOKtw81KqRCNJ211el0WQ"
            // logger.info("before all")

            // const user = {
            //     userName: "bati",
            //     email: 'b@b',
            //     password: 'bbb',
            // };
            // const newToken = await request(app).post('/users/').send(user);
            // logger.info("token: " + JSON.stringify(newToken.body));
            // token = newToken.body

            // userTest = newUser.body
            // userTestId = userTest._id!;
            // const response = await request(app).post('/auth/').send({ "email": userTest.email, "password": userTest.password });

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

    it('POST /api/users/', async () => {
        const user: User = {
            username: 'test',
            email: 't@t',
            password: 'ttt',
        };

        const response = await request(app)
            .post('/users/')
            .send(user)
            .set('Authorization', `Bearer ${token}`);
        userTest = response.body
        userTestId = response.body._id!
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe('t@t');
        expect(response.body.username).toBe('test');
    });

    it('PUT /users/:id', async () => {
        const updatedUser: User = {
            username: 'test updated',
            email: 't@t updated',
            password: 'ttt updated',
        };

        const response = await request(app)
            .put(`/users/${userTestId}`)
            .send(updatedUser)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeLessThan(401);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
    });

    it('DELETE /users/:id', async () => {
        const response = await request(app)
            .delete(`/users/${userTestId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(204);
    });

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




