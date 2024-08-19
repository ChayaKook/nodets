import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`Global error handler: ${err.message}`);
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: 'Internal Server Error',
        error: err.message,
    });
};

export default errorHandler;
