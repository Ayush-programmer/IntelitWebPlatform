import * as courseService from '../services/course.service.js';

export const createCourse = async (req, res) => {
    try {
        console.log(req.body);
        
        const { title, description, category, price, thumbnail, courseContents, topicsToLearn, faq, references, materials, reviews, enrolledStudents } = req.body;

        if (!title || !description || !category || !thumbnail) {
            return res.status(400).json({ error: "Title, description, category, and thumbnail are required." });
        }

        console.log(req.user);

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

        console.log(newCourse);

        res.status(201).json({ message: "Course created successfully", course: newCourse });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getCourseById = async (req, res) => {
    try {
        console.log('controllers course.controller.js getCourseById called');
        
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
    console.log(req.user);
    
    try {
        const teacherId = req.user._id;
        const courses = await courseService.getAllCoursesByTeacher(teacherId);
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllCourses = async (req, res) => {
    console.log('controllers course.controller.js getAllCourses called');
    
    try {
        const courses = await courseService.getAllCourses();
        console.log(courses);
        
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, category, price, courseContents, topicsToLearn, faq, references, materials, reviews } = req.body;

        if (!title || !description || !category ) {
            return res.status(400).json({ error: "Title, description, category, and price are required." });
        }

        const updatedCourse = await courseService.updateCourse(courseId, req.user._id, {
            title,
            description,
            category,
            price,
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