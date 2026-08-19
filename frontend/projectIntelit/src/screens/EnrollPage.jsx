import axios from '../config/axios.js';
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';

const EnrollPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [teacher, setTeacher] = useState(null);

    const navigate = useNavigate();

    const { user, isLoading, fetchProfile } = useAuth();
    if (!user) {
        navigate('/login');
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpayScript();
        console.log(res);

        if (!res) {
            toast.error("Failed to load Razorpay SDK. Check your internet.");
            return;
        }
        try {
            const result = await axios.post("/payments/checkout", {
                courseId: course._id,
                amount: course.price * 100, // in paise
            });

            const order = result.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: course.title,
                description: "Course Enrollment",
                order_id: order.id,
                handler: async function (response) {
                    const paymentDetails = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId: user._id,
                        courseId: course._id,
                        teacherId: course.teacher._id,
                    };

                    try {
                        // Verify payment and enroll user
                        await axios.post("/payments/verify", paymentDetails)

                        await axios.post(`/course-progress/${course._id}`);
                        toast.success("Payment successful and user enrolled!");

                        navigate(`/payment-success/${course._id}`, {
                            replace: true
                        });

                        await fetchProfile();
                    } catch (error) {
                        toast.error("Payment success, but enrollment failed.");
                    };
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#785cf4",
                },
            };

            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error("Payment initiation failed:", error);
        }
    };


    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`/courses/${id}`);
            setCourse(res.data.course);
            setTeacher(res.data.course.teacher);
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (course) {
            console.log(course);
        }
    }, [course]);

    if (isLoading) {
        return <Loader />;
    }
    if (!course) return <div>Loading...</div>;

    return (
        <div className="enroll-container">
            <div className="enroll-card">
                <h1 className="title">{course.title}</h1>
                <p className="desc">{course.description}</p>

                <div className="info-row">
                    <div className="info-block">
                        <h3>Instructor</h3>
                        <p><strong>{teacher.name}</strong></p>
                        <p><strong>{teacher.email}</strong></p>
                        {/* <p>{teacher.bio}</p> */}
                    </div>
                    <div className="info-block">
                        <h3>Course Info</h3>
                        <p><strong>Category:</strong> {course.category}</p>
                        <p><strong>Level:</strong> {course.level}</p>
                    </div>
                </div>

                <div className="payment-box">
                    <span className="price">₹{course.price}</span>
                    <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
                </div>
            </div>
        </div>
    );
};

export default EnrollPage;
