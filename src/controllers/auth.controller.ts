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
        const body = req.body;
        if(!(body.email&&body.password)){
            throw new Error("Bad Request");
        }
        let userDetails = { email: body.email, password: body.password };
        
        const user:User|null = await User.findOne({ email: userDetails.email })
        if(!user?.password){
            throw new Error("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(userDetails.password, user!.password);

        if (isPasswordMatch) {
            const token = await authService.createToken(user!)
            const send:Object = {"token":token}
            logger.info(send)
            res.json(send)
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