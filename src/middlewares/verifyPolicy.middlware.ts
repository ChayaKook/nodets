import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { TOKEN_KEY } from '../../constants';

const verifyAuthorizationLevel = (requiredLevel: number) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        jwt.verify(token, TOKEN_KEY, (err, decoded: any) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            const { policy } = decoded;
            if (policy !== requiredLevel) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            next();
        });
    };
};
