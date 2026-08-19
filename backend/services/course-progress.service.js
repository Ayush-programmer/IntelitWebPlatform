import CourseProgress from "../models/courseProgress.model.js";
import courseModel from "../models/course.model.js";
import userModel from '../models/user.model.js'

export const createProgressService = async (userId, courseId) => {
    if (!userId || !courseId) {
        throw new Error("User ID and Course ID is required");
    }

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            throw new Error("Course not exists");
        }
        const isEnrolled = course.enrolledStudents?.some(
            id => id.toString() === userId.toString()
        );

        if (!isEnrolled) {
            throw new Error("Can't create progress, you're not enrolled in the course");
        }
        const existingProgress = await CourseProgress.findOne({ user: userId, course: courseId });
        if (existingProgress) {
            throw new Error("Error! Duplicate Course Progress Creation");
        }
        const lessons = course.courseContents.flatMap(module => module.lessons.map(lesson => ({
            lessonId: lesson._id,
            watchedSeconds: 0,
            progress: 0,
            completed: false
        })));
        const courseProgress = await CourseProgress.create({ user: userId, course: courseId, lessons: lessons });

        return courseProgress;
    } catch (error) {
        throw error;
    }
}

export const getCoursesProgressService = async (userId) => {
    try {
        const enrolledStudent = await userModel.findById(userId);
        if (!enrolledStudent) {
            throw new Error("User not found");
        }
        const enrolledCourses = enrolledStudent.enrolledCourses || [];
        const coursesProgress = await CourseProgress.find({ user: userId, course: { $in: enrolledCourses } });
        const result = coursesProgress.map(progress => {
            const lessons = progress.lessons;
            const totalProgress = lessons.length ? lessons.reduce((sum, lesson) => sum + lesson.progress, 0) / lessons.length : 0;
            return {
                courseId: progress.course,
                progress: Math.round(totalProgress)
            };
        })
        return result;
    } catch (error) {
        throw error;
    }
}

export const getCourseProgressSerice = async (userId, courseId) => {
    try {
        const courseProgress = await CourseProgress.findOne({
            user: userId, course: courseId
        });

        if (!courseProgress) {
            throw new Error("Course progress not found");
        }
        return courseProgress;
    } catch (error) {
        throw error;
    }
}

export const updateCourseProgressService = async (
    userId,
    courseId,
    lessonId,
    watchedSeconds,
    duration
) => {
    try {
        const currentCourseProgress =
            await CourseProgress.findOne({
                user: userId,
                course: courseId
            });

        if (!currentCourseProgress) {
            throw new Error("Course progress not found");
        }

        const lessonProgress =
            currentCourseProgress.lessons.find(
                lesson =>
                    lesson.lessonId.toString() ===
                    lessonId.toString()
            );

        if (!lessonProgress) {
            throw new Error(
                "Lesson does not belong to this course"
            );
        }

        // Basic validation
        if (
            typeof watchedSeconds !== "number" ||
            typeof duration !== "number" ||
            duration <= 0 ||
            watchedSeconds < 0
        ) {
            throw new Error("Invalid progress data");
        }

        // Never allow watched time beyond video duration
        const safeWatchedSeconds = Math.min(
            watchedSeconds,
            duration
        );

        // Watched seconds should NEVER go backwards.
         
        lessonProgress.watchedSeconds = Math.max(
            lessonProgress.watchedSeconds,
            safeWatchedSeconds
        );

        /*
         * Calculate progress from watched time.
         */
        const calculatedProgress = Math.min(
            100,
            Math.floor(
                (lessonProgress.watchedSeconds / duration) * 100
            )
        );

        lessonProgress.progress = calculatedProgress;

        lessonProgress.lastWatchedAt = new Date();

        /* Completion threshold.
         Once completed, not allowing it to become
         incomplete again.
        */
        if (
            calculatedProgress >= 90 ||
            lessonProgress.watchedSeconds >= duration
        ) {
            lessonProgress.progress = 100;
            lessonProgress.completed = true;
        }

        await currentCourseProgress.save();

        return currentCourseProgress;

    } catch (error) {
        throw error;
    }
};