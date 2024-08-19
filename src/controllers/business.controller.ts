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
 *   name: Business
 *   description: API endpoints for managing business details
 *   security:
 *     - BearerAuth: []

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
        const business = await businessService.getBusiness();
        res.send(business)
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getBusiness - Success`);

    } catch (error) {
        logger.error(`[GET] - ${new Date().toISOString()} - getBusiness - Error: ${error}`);
        throw error;
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
        logger.info(`[POST] - ${new Date().toISOString()} - createBusiness - Success`);
    } catch (error) {
        logger.error(`[POST] - ${new Date().toISOString()} - createBusiness - Error: ${error}`);
        throw error;
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

router.put('/:id', (req: Request, res: Response) => {
    try {
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateBusiness - Success`);
    } catch (error) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateBusiness - Error: ${error}`);
        throw error;
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
        await businessService.deleteBusiness(businessId);
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteBusiness - Success`);

        res.status(204).send();
    } catch (error) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteBusiness - Error: ${error}`);
        throw error;
    }
});

export { router };
