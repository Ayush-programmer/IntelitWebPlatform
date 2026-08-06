import * as courseService from '../services/course.service.js';
import teacherModel from '../models/teacher.model.js';
import cloudinary from '../db/cloudinary.js';

export const createCourse = async (req, res) => {
    try {
        console.log(req.body);

        const { title, description, category, price, thumbnail, courseContents, topicsToLearn, faq, references, materials, reviews, enrolledStudents } = req.body;

        if (!title || !description || !category || !thumbnail) {
            return res.status(400).json({ error: "Title, description, category, and thumbnail are required." });
        }

        const newCourse = await courseService.createCourse({
            title,
            description,
            category,
            price,
            thumbnail,
            teacherId: req.user._id, // Authenticated teacher
            courseContents,
            topicsToLearn,
            faq,
            reviews,
            references,
            materials,
            enrolledStudents
        });

        // Update the teacher's courseCreated field with the new course ID
        await teacherModel.findByIdAndUpdate(
            req.user._id,
            { $push: { createdCourses: newCourse._id } },
            { new: true }
        );

        console.log(newCourse);

        res.status(201).json({ message: "Course created successfully", course: newCourse });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await courseService.findCourseById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCoursesByTeacher = async (req, res) => {
    try {
        const teacherId = req.user._id;
        const courses = await courseService.getAllCoursesByTeacher(teacherId);
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();

        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, category, price, thumbnail, courseContents, topicsToLearn, faq, references, materials } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({ error: "Title, description, category, and price are required." });
        }

        const updatedCourse = await courseService.updateCourse(courseId, req.user._id, {
            title,
            description,
            category,
            price,
            thumbnail,
            courseContents,
            topicsToLearn,
            faq,
            references,
            materials
        });

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found or you are not authorized to update this course" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const teacherId = req.user._id; // Authenticated teacher ID

        const deletedCourse = await courseService.deleteCourse(courseId, teacherId);

        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found or unauthorized access" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addReview = async (req, res) => {
    try {
        const { courseId, student, rating, reviewText } = req.body;

        if (!courseId || !student || !rating || !reviewText) {
            return res.status(400).json({ error: "Course ID, student ID, rating, and review text are required." });
        }

        const updatedCourse = await courseService.addReview(courseId, student, rating, reviewText);

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ message: "Review added successfully", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteVideos = async (req, res) => {
    try {
        const { publicIds } = req.body;

        if (!Array.isArray(publicIds) || publicIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "publicIds must be a non-empty array."
            });
        }

        const results = await Promise.allSettled(
            publicIds.map(publicId =>
                cloudinary.uploader.destroy(publicId, {
                    resource_type: "video"
                })
            )
        );

        res.status(200).json({
            success: true,
            results
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}