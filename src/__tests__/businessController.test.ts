// businessController.test.ts

import request from 'supertest';
import app from '../app';
import { Business } from '../../src/db/schemas/business.schema';

import log4js from 'log4js';
log4js.configure('./log4js.json');
const logger = log4js.getLogger();


describe('business API', () => {
    let token: string = ""
    let businessTestId: string = ""
    let businessTest: Business | any

    beforeAll(async () => {
        logger.info("businessController start")
        try {
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
        logger.info("businessController finish")

        // const newbusiness = await request(app).delete(`/businesss/${businessTestId}`)
        // logger.info("business deleted")
    });

    it('POST /api/business/', async () => {
        const business: Business = {
            name: "תותיות",
            phone: "02-212-213",
            address: "פירות היער 22",
            admin: {
                _id: "66c51eecde32c42ad7879edd",
                username: "test updated",
                email: "t@t updated",
                password: "ttt updated",
            }
        };

        const response = await request(app)
            .post('/business/')
            .send(business)
            .set('Authorization', `Bearer ${token}`);
        businessTest = response.body
        businessTestId = response.body._id!
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("תותיות");
    });

    it('PUT /business/:id', async () => {
        const business: Business = businessTest
        business.name="תותים"
        const response = await request(app)
            .put(`/business/${businessTestId}`)
            .send(business)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(200);

    });

    it('GET /business/', async () => {

        const response = await request(app)
            .get('/business/')
            .set('Authorization', `Bearer ${token}`);
        expect(response).toHaveProperty('status', 200);
        expect(response.body.name).toBe("תותים");
    });
    
    it('DELETE /business/:id', async () => {
        const response = await request(app)
            .delete(`/business/${businessTestId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBeGreaterThanOrEqual(200);
        expect(response.status).toBe(204);
    });

});
