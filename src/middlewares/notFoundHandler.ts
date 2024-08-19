import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    logger.error(`404 Error: Route not found - ${req.originalUrl}`);
    
    res.status(404).json({
        message: 'Route not found. Error reported for further investigation.',
    });
    
    next(error);
};

export default notFoundHandler;
