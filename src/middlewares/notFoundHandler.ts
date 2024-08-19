import { Request, Response, NextFunction } from 'express';
import log4js from 'log4js';

log4js.configure('./log4js.json');
const logger = log4js.getLogger();

export const notFoundHandler = (req: Request, res: Response) => {
    logger.error('404 - Not Found: ' + req.url);
    res.status(404).send('404 - Not Found');
};

export default notFoundHandler;
