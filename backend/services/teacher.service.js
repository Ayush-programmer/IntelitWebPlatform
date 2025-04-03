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
    const teacher = await teacherModel.findOne({ email: email });

    return teacher;
}

export const getAllTeachers = async ({ teacherId }) => {
    const teachers = await teacherModel.find({
        _id: { $ne: teacherId }
    });

    return teachers;
}