// orderController.test.ts

import request from 'supertest';
import app from '../app';
import { Order } from '../../src/db/schemas/order.schema';

import log4js from 'log4js';
log4js.configure('./log4js.json');
const logger = log4js.getLogger();


describe('order API', () => {
    let token: string = ""
    let orderTestId: string = ""
    let orderTest: Order | any

    beforeAll(async () => {
        logger.info("orderController start")

        try {
            //get token for all tests
            token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmM1MjY0NTE3MDE1NTIxMGViZjY2ODgiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRAdCIsImlhdCI6MTcyNDIyNzk0NiwiZXhwIjoxNzI0MjM4NzQ2fQ.8f0NMtLizVqGOQEb9FNRzGp2DSyLhzzbgxadPA_PzXc"

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
        logger.info("orderController finish")
    });

    it('GET /orders/', async () => {

        const response = await request(app)
            .get('/orders/')
            .set('Authorization', `Bearer ${token}`);
        expect(response).toHaveProperty('status', 200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('POST /api/orders/', async () => {
        const order: Order = {
            products: [],
            totalSum: 200,
            status: "בטיפול",
            date: new Date("2022-01-01"),
            userId: '66c51eecde32c42ad7879edd'
        };

        const response = await request(app)
            .post('/orders/')
            .send(order)
            .set('Authorization', `Bearer ${token}`);
        orderTest = response.body
        orderTestId = response.body._id!
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
        expect(response.body.totalSum).toBe(200);
    });


    it('PUT /orders/:id', async () => {
        orderTest.totalSum = 500

        const response = await request(app)
            .put(`/orders/${orderTestId}`)
            .send(orderTest)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
    });

    it('GET /orders/:id', async () => {
        const response = await request(app)
            .get('/orders/'+orderTestId)
            .set('Authorization', `Bearer ${token}`);
        expect(response).toHaveProperty('status', 200);
        expect(response.body.totalSum).toBe(500);
        
    });
    
    it('DELETE /orders/:id', async () => {
        const response = await request(app)
            .delete(`/orders/${orderTestId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
    });

});
