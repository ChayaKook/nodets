// user.controller.ts

import { Request, Response } from 'express';
import express from 'express';
import UserService from '../services/user.service';
import { User } from '../db/schemas/user.schema';
import logger from '../logger';

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       '200':
 *         description: User created successfully
 */
router.get('/', (req:Request, res:Response) => {
    try {
        logger.info(`[GET] - ${new Date().toISOString()} - getUsers - Success`);

        let users = userService.getUsers();
        users.then(users => {
            users.forEach(user => {
               console.log(`User: ${JSON.stringify(user)}`);
            });
        });
        
        return users
    } catch (error) {
        logger.error(`[GET] - ${new Date().toISOString()} - getUsers - Error: ${error}`);
        throw error;
    }
}
)

/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     summary: Get a user by ID
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
})

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
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
})

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update a user
 *     responses:
 *       '200':
 *         description: User updated successfully
 */
router.put('/:id',  (req: Request, res: Response)=> {
    try {
        logger.info(`[UPDATE] - ${new Date().toISOString()} - updateUser - Success`);

        const updatedUser: User = req.body;
        const user = userService.updateUser(updatedUser);
        res.status(200).json(user);
    } catch (error) {
        logger.error(`[UPDATE] - ${new Date().toISOString()} - updateUser - Error: ${error}`);
        throw error
    }
})

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
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
        throw error
    }
})

export { router };