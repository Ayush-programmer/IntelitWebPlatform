import React, { createContext, useEffect, useState } from "react";
import axios from "../config/axios.js";
import { isTokenExpired } from "../utils/tokenUtility.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        console.log("Fetching user data with token:", token);
        
        const role = localStorage.getItem("role");
        console.log("User role from localStorage:", role);

        if (role === "teacher") {
            setUser(null);
            setRole(role);
            setIsLoading(false);
            return;
        }

        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        console.log("Checking if token is expired..." , isTokenExpired);

        if(isTokenExpired(token)) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setUser(null);
            setIsLoading(false);
        }

        try {
            setIsLoading(true);
            const response = await axios.get("/users/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("User data:", response.data.user);
            setUser(response.data.user);

        } catch (err) {
            console.error("Error fetching user data:", err);

        //     const status = err?.response?.status;
        //     const msg = err?.response?.data?.error;

        //     if (status === 401 && (msg === "Token expired" || msg === "Invalid token" || msg === "No token provided")) {
        //         // Handle expired/invalid token
        //         localStorage.removeItem("token");
        //         localStorage.removeItem("role");
        //         setUser(null);
        //         setError("Session expired. Please login again.");
        //         // Redirect to login
        //         window.location.href = "/login";
        //     } else if (status === 403 && msg === "Token blacklisted") {
        //         // Handle logged-out sessions
        //         localStorage.removeItem("token");
        //         localStorage.removeItem("role");
        //         setUser(null);
        //         setError("You have been logged out. Please login again.");
        //         window.location.href = "/login";
        //     } else {
        //         setError("Failed to fetch user data");
        //         setUser(null);
        //     }
        // } finally {
        //     setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const clearUser = () => {
        setUser(null);
        setError(null);
    };

    const value = {
        user,
        setUser,
        role,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateUser,
        clearUser,
        fetchUserData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};