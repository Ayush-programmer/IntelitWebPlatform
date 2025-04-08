import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized User' });
        }

        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            console.log("Token is blacklisted");
            res.cookie('token', '');
            return res.status(401).json({ error: 'Unauthorized User' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT Error:", error);
        res.status(401).json({ error: 'Please authenticate' });
    }
}


export const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Forbidden: You do not have permission to perform this action' });
        }
        next();
    };
};
