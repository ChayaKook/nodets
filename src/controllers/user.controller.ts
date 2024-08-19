// user.controller.ts

import { Request, Response } from 'express';
import express from 'express';
import UserService from '../services/user.service';
import { User } from '../db/schemas/user.schema';
import log4js from 'log4js';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 */

router.get('/', async (req: Request, res: Response) => {
    try {
        let users = await userService.getUsers();
        res.send(users)
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - getUsers - Success`);

    } catch (error) {
        logger.error(`[GET] - ${new Date().toISOString()} - getUsers - Error: ${error}`);
        throw error;
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
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
    } catch (error) {
        logger.error(`[GET] - ${new Date().toISOString()} - getUserById - Error: ${error}`);
        throw error;
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User created successfully
 */

router.post('/', (body: { userName: string, email: string, password: string }) => {
    try {
        console.log(body);

        const user: User = { username: body.userName, email: body.email, password: body.password };
        if (!user) {
            // throw new Error("Bad Params");
            // return res.status(400).send("bad params")
        }
        const createdUser = userService.createUser(user);
        logger.info(`[POST] - ${new Date().toISOString()} - createUser - Success`);
        return createdUser;
    } catch (error) {
        logger.error(`[POST] - ${new Date().toISOString()} - createUser - Error: ${error}`);
        // throw error;
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
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
    } catch (error) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateUser - Error: ${error}`);
        throw error;
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
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
        logger.info(`[DELETE] - ${new Date().toISOString()} - deleteUser - Success`);

        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (error) {
        logger.error(`[DELETE] - ${new Date().toISOString()} - deleteUser - Error: ${error}`);
        throw error;
    }
});

export { router };
