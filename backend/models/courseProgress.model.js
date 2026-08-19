import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
    {
        lessonId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        watchedSeconds: {
            type: Number,
            default: 0,
            min: 0,
        },

        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        lastWatchedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false }
);

const courseProgressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        lessons: {
            type: [lessonProgressSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

courseProgressSchema.index(
    { user: 1, course: 1 },
    { unique: true }
);

const CourseProgress = mongoose.model(
    "CourseProgress",
    courseProgressSchema
);

export default CourseProgress;