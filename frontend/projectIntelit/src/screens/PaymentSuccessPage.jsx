import React, { useEffect, useContext, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../assets/Success-Lotie-Animation.json";
import axios from "../config/axios.js";
import { useAuth } from "../hooks/useAuth.js";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/course/${courseId}`, { replace: true });
        }, 5000);

        return () => clearTimeout(timer);
    }, [courseId, navigate]);

    return (
        <div className="success-container">
            <div className="success-card">
                <Player
                    autoplay
                    loop={false}
                    src={successAnimation}
                    style={{ height: "200px", width: "200px" }}
                />

                <h1>Payment Successful!</h1>

                <p className="message">
                    Welcome aboard! You're enrolled 🎉
                </p>

                <div className="redirect-msg">
                    <span>Redirecting to course</span>
                    <span className="dot-flashing"></span>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;