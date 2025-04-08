import teacherModel from '../models/teacher.model.js'
import * as teacherService from '../services/teacher.service.js'
import { validationResult } from 'express-validator'
import redisClient from '../services/redis.service.js'

export const createTeacherController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
        const teacher = await teacherService.createTeacher(name, email, password);
        console.log(teacher);
        const token = await teacher.generateJWT();
        console.log(token);
        delete teacher._doc.password;
        res.status(201).json({ teacher, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const loginTeacherController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const teacher = await teacherModel.findOne({ email }).select('+password');
        if (!teacher) {
            return res.status(401).json({ error: 'No such account found' });
        }

        const isMatch = await teacher.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = await teacher.generateJWT({ role: "teacher" });

        res.cookie('token', token);

        res.status(200).json({ teacher, token, role: "teacher" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const profileController = async (req, res) => {
    const teacher = await teacherService.findTeacher({ email: req.user?.email });
    console.log(teacher);

    res.status(200).json({ teacher: teacher });
}

export const getTeacherByIdController = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const teacher = await teacherService.findTeacher({ _id: id });
    if (!teacher) {
        return res.status(404).json({ error: 'No such account found' });
    }

    res.status(200).json({ teacher });
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

export const getAllTeachers = async ({ teacherId }) => {
    const teachers = await teacherModel.find({
        _id: { $ne: teacherId }
    });

    return teachers;
}