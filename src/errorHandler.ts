import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`[ERROR] - ${new Date().toISOString()} - ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
};