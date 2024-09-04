import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../../constants';
import log4js from 'log4js';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();
const tokenAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token||token==undefined) {
            throw new Error("No token provided");
        }
        
        jwt.verify(token, TOKEN_KEY);
        logger.info(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - TokenAuthMiddleware - Success`);

        next();
    } catch (error) {
        logger.error(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - TokenAuthMiddleware - Faild - Error: ${error}`);
        return res.status(401).json({ message: error });
    }
};

export default tokenAuthMiddleware;
