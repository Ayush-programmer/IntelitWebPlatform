import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    status: {
        type: String,
        default: "Success",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model("Payment", paymentSchema);

export default Project;