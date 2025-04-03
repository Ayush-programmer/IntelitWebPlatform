import mongoose, { mongo } from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,   
    },
    description: {
        type: String,
        required: true,
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    },
    topicsToLearn: [{
        type: String,
    }],
    faq: [{
        question: String,
        answer: String,
    }],
    references: [{
        type: String,
    }],
    materials: [{
        desc: {
            type: String,
            required: true,
        },
        fileURL: {
            type: String,
            required: true,
        }
    }],
    reviews: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
        },
        reviewText: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }],
    courseContents: [{
        moduleTitle: {
            type: String,
            required: true,
        },
        lessons: [{
            lesssonTitle: {
                type: String,
                required: true,
            },
            videoURL: {
                type: String,
                required: true,
            },
            videoDuration: {
                type: Number,
                required: true,
            },
        }],
    }],
    price: {
        type: Number,
        default: 0, // Default to free courses
        min: 0,
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

export default Course