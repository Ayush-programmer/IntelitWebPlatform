import jwt from "jsonwebtoken";
// import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // removing redis
        // const isBlacklisted = await redisClient.get(token);
        // if (isBlacklisted) {
        //     res.clearCookie('token');
        //     return res.status(403).json({ error: 'Token is blacklisted' });
        // }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to perform this action' });
        }
        next();
    };
};