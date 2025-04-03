import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';
import { authUser, authorizeRole } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/create', authUser, authorizeRole("teacher"), courseController.createCourse);

router.get('/allcourses', courseController.getAllCourses)

router.get('/coursesbyteacher',authUser, authorizeRole("teacher"), courseController.getAllCoursesByTeacher);

router.get('/:courseId', courseController.getCourseById);

router.put('/update/:courseId', authUser, authorizeRole("teacher"), courseController.updateCourse);

router.delete('/delete/:courseId', authUser, authorizeRole("teacher"), courseController.deleteCourse);

export default router;