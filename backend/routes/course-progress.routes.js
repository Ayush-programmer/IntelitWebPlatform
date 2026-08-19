import { Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as courseProgressController from '../controllers/course-progress.controller.js'

const router = Router();

router.post('/:courseId', authMiddleware.authUser, courseProgressController.createProgress);

router.get('/', authMiddleware.authUser, courseProgressController.getCoursesProgress);

router.get('/:courseId', authMiddleware.authUser, courseProgressController.getCourseProgress);

router.patch('/:courseId/lessons/:lessonId', authMiddleware.authUser, courseProgressController.updateProgress);

export default router;