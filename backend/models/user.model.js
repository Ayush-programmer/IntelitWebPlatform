import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [6, 'username must be at least 6 characters long'],
        maxlength: [50, 'username must be at most 50 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [6, 'Email must be at least 6 characters long'],
        maxlength: [50, 'Email must be at most 50 characters long']
    },
    password: {
        type: String,
        select: false
    },
},  {
    timestamps: true
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJWT = function ()
 {
    return jwt.sign({ email: this.email, _id: this._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const User = mongoose.model('User', userSchema);

export default User;