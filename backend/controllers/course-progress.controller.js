import * as courseProgressService from '../services/course-progress.service.js'

export const createProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const courseProgress = await courseProgressService.createProgressService(userId, courseId);
        return res.status(201).json({
            success: true,
            message: "Course progress created successfully",
            courseProgress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCoursesProgress = async (req, res) => {
    try {
        const userId = req.user._id;
        const coursesProgress = await courseProgressService.getCoursesProgressService(userId);
        return res.status(200).json({
            success: true,
            coursesProgress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;
        const courseProgress = await courseProgressService.getCourseProgressSerice(userId, courseId);
        return res.status(200).json({
            success: true,
            courseProgress
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.params;
        const userId = req.user._id;

        const {
            watchedSeconds,
            duration
        } = req.body;

        const updatedProgress =
            await courseProgressService.updateCourseProgressService(
                userId,
                courseId,
                lessonId,
                watchedSeconds,
                duration
            );

        return res.status(200).json({
            success: true,
            updatedProgress
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};