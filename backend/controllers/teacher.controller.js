import teacherModel from '../models/teacher.model.js'
import * as teacherService from '../services/teacher.service.js'
import { validationResult } from 'express-validator'
// import redisClient from '../services/redis.service.js'

export const createTeacherController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const teacher = await teacherService.createTeacher(name, email, password);
        const token = await teacher.generateJWT();
        delete teacher._doc.password;
        res.status(201).json({ teacher, token, role: "teacher" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Split code into service

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

    res.status(200).json({ teacher: teacher });
}

export const completeProfileController = async (req, res) => {
    try {
        const { fullName, phoneNumber, gender, dateOfBirth, bio, profilePic, education, currentPosition, techStack, socialLinks } = req.body;
        const teacher = await teacherService.findTeacher({ email: req.user?.email });
        if (!teacher) {
            return res.status(404).json({ error: 'No such account found' });
        }

        const updatedTeacher = await teacherService.updateTeacherProfile(teacher._id, {
            profile: {
                fullName,
                phoneNumber,
                gender,
                dateOfBirth,
                bio,
                profilePic,
                education,
                currentPosition,
                techStack: techStack,
                socialLinks
            },
            isProfileComplete: true
        },
            { new: true }
        );
        console.log(updatedTeacher);

        res.status(200).json({ message: 'Profile updated successfully', teacher: updatedTeacher });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const teacherId = req.user._id; // JWT middleware sets this
        const teacher = await teacherModel.findById(teacherId);

        if (teacher.isProfileComplete === false) {
            return res.status(400).json({ error: 'Please complete your profile first' });
        }
        const { fullName, phoneNumber, gender, dateOfBirth, bio, profilePic, education, currentPosition, techStack, socialLinks } = req.body;
        const updatedTeacher = await teacherService.updateTeacherProfile(teacherId, {
            profile: {
                fullName,
                phoneNumber,
                gender,
                dateOfBirth,
                bio,
                profilePic,
                education,
                currentPosition,
                techStack: techStack,
                socialLinks,
            }
        }, { new: true });

        console.log(updatedTeacher);

        res.status(200).json({ message: 'Profile updated successfully', teacher: updatedTeacher });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

export const getCreatedCourses = async (req, res) => {
    const teacher = await teacherService.findTeacher({ email: req.user?.email });
    if (!teacher) {
        return res.status(404).json({ error: 'No such account found' });
    }

    res.status(200).json({ courses: teacher.createdCourses });
}

export const getTeacherByIdController = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const teacher = await teacherService.findTeacher({ _id: id }); // may (error)
    if (!teacher) {
        return res.status(404).json({ error: 'No such account found' });
    }

    res.status(200).json({ teacher });
}

export const logoutController = async (req, res) => {
    try {
        // const token = req.cookies?.token || req.headers?.authorization.split(' ')[1];
        // redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        
        res.clearCookie("token");

        console.log(res);
        

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