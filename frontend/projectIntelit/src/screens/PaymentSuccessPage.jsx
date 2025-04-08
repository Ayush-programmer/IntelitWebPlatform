import React, { useEffect, useContext, use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import successAnimation from "../assets/Success-Lotie-Animation.json";
import { UserContext } from "../context/user.context.jsx";
import axios from "../config/axios.js";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("Token at PaymentSuccessPage:", localStorage.getItem("token"));
    }, []);


    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        setTimeout(() => {
            navigate(`/course/${courseId}`);
        }, 5000);

    }, [user, navigate]);

    useEffect(() => {
        console.log("User:", user);
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

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
                <p className="message">Welcome aboard! You're enrolled 🎉</p>
                <div className="redirect-msg">
                    <span>Redirecting to course</span>
                    <span className="dot-flashing"></span>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;