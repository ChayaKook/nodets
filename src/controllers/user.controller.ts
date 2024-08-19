// user.controller.ts

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
import { isContext } from 'vm';
import { RequestBody } from 'swagger-jsdoc';
const authService = new AuthService()


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 *   security:
 *     - BearerAuth: []
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        let users = await userService.getUsers();
        res.send(users)
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getUsers - Success`);

    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getUsers - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
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
 *       '200':
 *         description: User details
 */

router.get('/users/:id', (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        logger.info(`[GET] - ${new Date().toISOString()} - getUserById - Success`);
        return userService.getUserById(userId);
    } catch (error:any) {
        logger.error(`[GET] - ${new Date().toISOString()} - getUserById - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     Body:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User created successfully
 */


router.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body; // Access the entire request body
        
        if(body.password === undefined){
            throw new Error("Bad Request");
        }
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);

        const user: User = { username: body.userName, email: body.email, password: hashedPassword };
        if (!user) {
            throw new Error("Created Faild");
        }
        const createdUser = await userService.createUser(user);
        logger.info(`[POST] - ${new Date().toISOString()} - createUser - Success`);
        res.send(createdUser);
    } catch (error:Error|any) {
        logger.error(`[POST] - ${new Date().toISOString()} - createUser - Error: ${error}`);
        res.status(400).send(error!.message);
    }
});


/**
 * @swagger
 * /users/:id:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 */

router.put('/:id', (req: Request, res: Response) => {
    try {
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateUser - Success`);

        const updatedUser: User = req.body;
        const user = userService.updateUser(updatedUser);
        res.status(200).json(user);
    } catch (error:any) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateUser - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

/**
 * @swagger
 * /users/:id:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
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
        const userId = req.params.id;
        await userService.deleteUser(userId);
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteUser - Success`);

        res.status(204).send();
    } catch (error:any) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteUser - Error: ${error}`);
        const statusCode = error!.status! || 500;
        res.status(statusCode).send({ message: error.message })
    }
});

export { router };
