import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (exceptions.includes(req.originalUrl)){
        return next();
    }

    const secret = process.env.SECRET;
    if (!secret) {
        return res.json({status: 'error', data: "Please configure environment file"});
    }
    const token = req.headers.authorization?.slice(7);
    if (!token) {
        return res.status(401).json({status: 'error', data: "Invalid token"});;
    }

    try {
        const decoded = jwt.verify(token, secret);
        next();
    }
    catch {
        return res.status(401).json({status: 'error', data: "Invalid token"});
    }
    
}

const exceptions = [
    '/login',
    '/subscribe',
    '/userlist'
];