import courseModel from "../models/course.model.js";

// Create new course

export const createCourse = async ({ title, description, category, thumbnail, teacherId, topicsToLearn = [], faq = [], references = [], materials = [], courseContents = [], price = 0, reviews = [], enrolledStudents = [] }) => {
    if (!title || !description || !category || !teacherId || !thumbnail) {
        throw new Error("Title, description, category and teacherId and thumbnail are required");
    }

    try {
        const course = await courseModel.create({ title, description, category, thumbnail, teacher: teacherId, materials, topicsToLearn, faq, references, price, courseContents, reviews, enrolledStudents });
        return course;
    } catch (error) {
        throw error;
    }
}

// Find Course by ID

export const findCourseById = async (courseId) => {
    try {
        const Course = await courseModel.findById(courseId).populate('teacher', 'name email profile').populate('reviews.student', 'username email profile');
        if (!Course) {
            throw new Error("Course not found");
        }
        return Course;
    } catch (error) {
        throw new Error("Error finding course: " + error.message);
    }
}

// Get all courses

export const getAllCourses = async () => {
    console.log('Fetching all courses...');

    try {
        const courses = await courseModel.find().populate('teacher', 'name email profile').populate('reviews.student', 'username email');
        return courses;
    } catch (error) {
        throw new Error("Error fetching courses: " + error.message);
    }
}

// Get all courses by teacher

export const getAllCoursesByTeacher = async (teacherId) => {
    try {
        const courses = await courseModel.find({ teacher: teacherId }).populate('teacher', 'name email').populate('reviews.student', 'username email');
        return courses;
    } catch (error) {
        throw new Error("Error fetching courses: " + error.message);
    }
}

// Update a course only if the teacher is owner of the course

export const updateCourse = async (courseId, teacherId, { title, description, category, materials, topicsToLearn = [], faq = [], references = [], price, courseContents, reviews }) => {
    if (!title || !description || !category || !teacherId) {
        throw new Error("Title, description, category and teacherId are required");
    }

    try {
        const course = await courseModel.findOneAndUpdate({ _id: courseId, teacher: teacherId }, { title, description, category, materials, topicsToLearn, faq, references, price, courseContents, reviews }, { new: true });
        if (!course) {
            throw new Error("Course not found or you are not the owner of the course");
        }
        return course;
    } catch (error) {
        throw new Error("Error updating course: " + error.message);
    }
}

// Delete a course only if the teacher is owner of the course

export const deleteCourse = async (courseId, teacherId) => {
    try {
        const course = await courseModel.findOneAndDelete({ _id: courseId, teacher: teacherId });
        if (!course) {
            throw new Error("Course not found or you are not the owner of the course");
        }
        return course;
    } catch (error) {
        throw new Error("Error deleting course: " + error.message);
    }
}

// Add a review to a course
export const addReview = async (courseId, studentId, rating, reviewText) => {
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            throw new Error("Course not found");
        }
        const review = { student: studentId, rating, reviewText };
        course.reviews.push(review);
        await course.save();
        return course;
    } catch (error) {
        throw new Error("Error adding review: " + error.message);
    }
}