import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [4, 'name must be at least 40 characters long'],
        maxlength: [80, 'name must be at most 80 characters long'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: [6, 'Email must be at least 6 characters long'],
        maxlength: [50, 'Email must be at most 50 characters long'],
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    bio: {
        type: String,
    },
    expertise: {
        type: String,
    },
    createdCourses: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Course'
    }],
}, {
    timestamps: true
});

teacherSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

teacherSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

teacherSchema.methods.generateJWT = function () {
    return jwt.sign({ email: this.email, _id: this._id, role: "teacher" }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;