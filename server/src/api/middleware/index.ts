import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { ENV } from '../../utils/variable';
import { Role } from '@prisma/client';

export const auth_middleware = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, ENV.SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
}

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