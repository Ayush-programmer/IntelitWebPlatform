import userModel from "../models/user.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from 'express-validator';
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { username, email, password } = req.body;
        const user = await userService.createUser(username, email, password);
        const token = await user.generateJWT({role: "student"});
        res.cookie('token', token);
        delete user._doc.password;
        res.status(201).json({ user, token, role: "student" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'No such account found' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = await user.generateJWT({role: "student"});

        res.cookie('token', token);

        res.status(200).json({ user, token, role: "student" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const profileController = async (req, res) => {
    const user = await userService.findUser({ email: req.user.email });
    console.log(user);
    
    res.status(200).json({ user: user });
}

export const profileByIdController = async (req, res) => {
    const { id } = req.params;
    const user = await userService.findUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
}

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization.split(' ')[1];
        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const AllUsers = await userService.getAllUsers({ userId: loggedInUser._id });
        res.status(200).json({ AllUsers });
    } catch (error) {
        console.log(error);

        res.status(400).json({ error: error.message });
    }
}