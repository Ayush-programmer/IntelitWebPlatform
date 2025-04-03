import { Router } from 'express';
import * as teacherController from '../controllers/teacher.controller.js';
import { body } from 'express-validator';
import * as authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register',
     body('email').isEmail().withMessage('Email must be a valid email address'),
     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
     teacherController.createTeacherController);

router.post('/login',
     body('email').isEmail().withMessage('Email must be a valid email address'),
     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
     teacherController.loginTeacherController);

router.get('/profile', authMiddleware.authUser, teacherController.profileController);

router.get('/logout', authMiddleware.authUser, teacherController.logoutController);

router.get('/all', authMiddleware.authUser, teacherController.getAllTeachers);

export default router;