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
    const user = await userModel.findOne({ email: email });

    return user;
}

export const findUserById = async ({ id }) => {
    const user = await userModel.findById(id);
    return user;
}

export const getAllUsers = async ({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });

    return users;
}