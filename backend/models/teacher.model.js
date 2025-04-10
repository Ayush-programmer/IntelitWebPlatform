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
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    profile: {
        fullName: {
            type: String,
            trim: true
        },
        phoneNumber: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']
        },
        dateOfBirth: {
            type: Date
        },
        bio: {
            type: String,
            maxlength: [300, 'Bio must be at most 300 characters long']
        },
        profilePic: {
            type: String
            // URL or image path
        },
        currentPosition: {
            type: String,
            trim: true
            // No enum, controlled by frontend
        },
        techStack: [{
            type: String,
            trim: true
        }],
        education: {
            type: String,
            trim: true
        },
        socialLinks: {
            linkedIn: { type: String, trim: true },
            github: { type: String, trim: true },
            twitter: { type: String, trim: true }
        }
    },
    createdCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
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