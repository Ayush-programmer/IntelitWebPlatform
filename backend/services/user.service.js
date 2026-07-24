import e from 'express';
import userModel from '../models/user.model.js'

export const createUser = async (username, email, password) => {
    if (!username || !email || !password) {
        throw new Error("Username, Email and password are required");
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({ username, email, password: hashedPassword });

    return user;
}

export const findUser = async ({ email }) => {
    const user = await userModel.findOne({ email: email })
        .populate('enrolledCourses', 'title thumbnail category') // <-- Fetch details
        .select('-password');

    return user;
}

export const findUserById = async ({ id }) => {
    try {
        console.log("entering findUserById");
        
        console.log(id); // <-- Log the ID to see if it's correct
        
        const user = await userModel.findById(id)
            .populate('enrolledCourses', 'title thumbnail category') // <-- Fetch details
            .select('-password');
        console.log(user); // <-- Log the user object to see the populated data
        console.log("leaving findUserById");
        
        return user;
    } catch (error) {
        throw new Error("User not found");
    }
}

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });

    return users;
}