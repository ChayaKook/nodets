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
        logger.info("userController start")

        try {
            //get token for all tests
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM1MjY0NTE3MDE1NTIxMGViZjY2ODgiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRAdCIsImlhdCI6MTcyNDIyNzk0NiwiZXhwIjoxNzI0MjM4NzQ2fQ.8f0NMtLizVqGOQEb9FNRzGp2DSyLhzzbgxadPA_PzXc"
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

    beforeEach(() => {
        jest.clearAllMocks();
    })
    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        logger.info("userController finish")

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

    it('GET /users/:id', async () => {

        const response = await request(app)
            .get('/users/'+userTestId)
            .set('Authorization', `Bearer ${token}`);
        expect(response).toHaveProperty('status', 200);
        expect(response.body.email).toBe('t@t updated');
        
    });

    it('DELETE /users/:id', async () => {
        const response = await request(app)
            .delete(`/users/${userTestId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(204);
    });

});
