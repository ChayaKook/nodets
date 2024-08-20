// auth.service.ts

import { User, UserDocument } from '../db/schemas/user.schema';
import mongoose, { Types } from 'mongoose';
const jwt = require('jsonwebtoken');
import { saltRounds, TOKEN_KEY } from "../../constants";


class AuthService {
    public async createToken(user: User): Promise<any> {
        try {
            const payload = { _id: user._id!, userName: user.username, email: user.email }
            const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '3h' });
            return token;
        }
        catch (error) {
            throw error;
        }
    }

    public async decodeToken(token: string) {
        try {
            const decoded = jwt.verify(token, TOKEN_KEY);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    };



}

export default AuthService;
