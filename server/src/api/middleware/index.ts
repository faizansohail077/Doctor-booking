import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { ENV } from '../../utils/variable';
import { Role } from '@prisma/client';

export const auth_middleware = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('A valid token is required for authentication');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET!);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

export const admin_middleware = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== Role.ADMIN) {
        return res.status(403).send('You are not authorized to access this resource');
    }

    return next();
}

export const patient_middleware = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== Role.PATIENT) {
        return res.status(403).send('You are not authorized to access this resource');
    }

    return next();
}

export const doctor_middleware = async (req: any, res: Response, next: NextFunction) => {
    if (req.user.role !== Role.DOCTOR) {
        return res.status(403).send('You are not authorized to access this resource');
    }

    return next();
}