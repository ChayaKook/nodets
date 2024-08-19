// auth.controller.ts

import { Request, Response } from 'express';
import express from 'express';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import { User } from '../db/schemas/user.schema';
import log4js from 'log4js';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

const router = express.Router();
const userService = new UserService();
const bcrypt = require('bcrypt');
import { saltRounds, TOKEN_KEY } from "../../constants";
const authService = new AuthService()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for authorization
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     responses:
 *       '200':
 *         description: create a token
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const req={
            params: {
                email: 'chaya@gmail',
                password: '10987'
            }
        }
        let userDetails = { email: req.params.email, password: req.params.password };
        // const hashedPassword = await bcrypt.hash(userDetails.password, saltRounds);
        const user = await User.findOne({ email: userDetails.email })
        const isPasswordMatch = await bcrypt.compare(userDetails.password, user!.password);

        if (isPasswordMatch) {
            res.send({ token: await authService.createToken(user!) })
        } else {
            throw new Error("Invalid email or password");
        }
        logger.info(`[GET] - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - Login - Success`);

    } catch (error:Error|any) {
        logger.error(`[GET] - ${new Date().toISOString()} - Login - Error: ${error}`);
        res.status(error!.status!|400).send(error.message);
    }
});

export { router };