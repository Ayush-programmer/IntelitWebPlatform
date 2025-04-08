import razorpay from '../utils/razorpay.js';
import crypto from "crypto";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Teacher from '../models/teacher.model.js';

export const createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = {
        amount: amount * 100, // amount in paise
        currency: currency || 'INR',
        receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ success: false, error: 'Something went wrong' });
    }
};

export const checkout = async (req, res) => {
    const { amount } = req.body;

    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = {
        amount,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send("Failed to create Razorpay order");
    }
}

export const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        userId,
        courseId,
        teacherId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // 1. Update user
        await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: courseId },
        });

        // 2. Update course
        await Course.findByIdAndUpdate(courseId, {
            $addToSet: { enrolledStudents: userId },
        });

        // 3. Update teacher's uploadedCourses

        await Teacher.findByIdAndUpdate(teacherId, {
            $addToSet: { createdCourses: courseId },
        });

        // 4. Save payment
        await Payment.create({
            user: userId,
            course: courseId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "Success",
        });

        res.json({ success: true, message: "Payment Verified and Enrollment Done", courseId });
    } else {
        res.status(400).json({ success: false, message: "Payment Verification Failed" });
    }
}