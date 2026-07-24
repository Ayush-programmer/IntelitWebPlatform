import teacherModel from '../models/teacher.model.js'

export const createTeacher = async (name, email, password) => {
    if (!name || !email || !password) {
        throw new Error("Name, Email and password are required");
    }

    const hashedPassword = await teacherModel.hashPassword(password);

    const teacher = await teacherModel.create({ name, email, password: hashedPassword });

    return teacher;
}

export const findTeacher = async ({ email }) => {
    const teacher = await teacherModel.findOne({ email: email }).populate('createdCourses', 'title category thumbnail').select('-password -__v');

    return teacher;
}

export const updateTeacherProfile = async (teacherId, updateData) => {
    const updatedTeacher = await teacherModel.findByIdAndUpdate(teacherId, updateData, { new: true }).select('-password -__v');

    return updatedTeacher;
}

export const getAllTeachers = async ({ teacherId }) => {
    const teachers = await teacherModel.find({
        _id: { $ne: teacherId }
    });

    return teachers;
}