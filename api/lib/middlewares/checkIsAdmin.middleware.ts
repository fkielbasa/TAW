import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from "../config";
import { Role } from '../types/role';
import { IUser } from 'modules/models/user.model';

export const auth = (request: Request, response: Response, next: NextFunction) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    
    if (!token || typeof token !== 'string') {
        return response.status(401).send('Access denied. No token provided.');
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, config.JwtSecret) as IUser;
        const userRole: Role = decoded.role; 
        
        if (userRole !== Role.ADMIN) {
            return response.status(403).json({ message: 'Forbidden. Only admins are allowed.' });
        }

        next();
    } catch (ex) {
        console.error('Error while decoding token:', ex);
        return response.status(400).send('Invalid token.');
    }
};
