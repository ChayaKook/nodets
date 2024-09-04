// business.controller.ts

import { NextFunction, Request, Response } from 'express';
import express from 'express';
import UserService from '../services/user.service';
import { User } from '../db/schemas/user.schema';
import log4js from 'log4js';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const userService = new UserService();
const bcrypt = require('bcrypt');
import { saltRounds, TOKEN_KEY } from "../../constants";
import AuthService from '../services/auth.service';
import tokenAuthMiddleware from '../middlewares/auth.middleware';
import { Business } from '../db/schemas/business.schema';
import BusinessService from '../services/business.service';
const businessService = new BusinessService()
const authService = new AuthService()


/**
 * @swagger
 * tags:
 *   name: business
 *   description: API endpoints for managing business details
 *   security:
 *     - BearerAuth: []
 */


/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get business details
 *     tags: [Business]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        const business:Business = await businessService.getBusiness();
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getBusiness - Success`);

        res.json(business)

    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getBusiness - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /business:
 *   post:
 *     summary: Create a new business
 *     tags: [Business]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User created successfully
 */

router.post('/', async (req:Request, res:Response) => {
    try {
        const business = req.body;
        const newBusiness = await businessService.createBusiness(business);
        logger.info(`[POST] - ${new Date().toISOString()} - createBusiness - Success`);
        res.json(newBusiness)
    } catch (error:any) {
        logger.error(`[POST] - ${new Date().toISOString()} - createBusiness - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /business/:id:
 *   put:
 *     summary: Update a user
 *     tags: [Business]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 */

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const businessId = req.params.id;
        const business = req.body;
        const businessUpdated:Business = await businessService.updateBusiness(businessId, business)
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateBusiness - Success: ${businessUpdated}`);
        res.json(businessUpdated)
    } catch (error:any) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateBusiness - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /Business/:id:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Business]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '204':
 *         description: User deleted successfully
 */

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const businessId = req.params.id;
        const businessDeleted = await businessService.deleteBusiness(businessId);
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteBusiness - Success: ${businessDeleted}`);

        res.status(204).send();
    } catch (error:any) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteBusiness - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

export { router };
