import { createContext, useEffect, useState } from "react";
import axios from "../config/axios.js";
import Loader from "../components/Loaders/Loader.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        const token = localStorage.getItem("token");
        const savedRole = localStorage.getItem("role");

        if (!token || !savedRole) {
            console.log("provider called");

            setIsLoading(false);
            return;
        }
        setRole(savedRole);
        setError(null);
        try {
            setIsLoading(true);
            if (savedRole === "teacher") {
                const { data } = await axios.get("/teachers/profile");
                setTeacher(data.teacher);
                setUser(null);
            } else {
                const { data } = await axios.get("/users/profile");
                setUser(data.user);
                setTeacher(null);
            }
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Something went wrong");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            setUser(null);
            setTeacher(null);
            setRole(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Can make below 3 fund async if later decide to fetch fresh profile data after login, add analytics, preload user settings, or perform another async task

    const loginStudent = ({ user, token }) => {
        // cookies change
        localStorage.setItem("token", token);
        localStorage.setItem("role", "student");

        console.log("Setting logged-in user:", user);
        setUser(user);
        setTeacher(null);
        setRole("student");
        setError(null);
    };

    const loginTeacher = ({ teacher, token }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", "teacher");

        setTeacher(teacher);
        setUser(null);
        setRole("teacher");
        setError(null);
    };

    const logout = async () => {
        try {
            if (role === "teacher") {
                await axios.get("/teachers/logout");
            } else {
                await axios.get("/users/logout");
            }
        } catch (err) {
            console.error(err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            setUser(null);
            setTeacher(null);

            setRole(null);
            setError(null);
        }
    };

    const value = {
        user,
        teacher,
        role,
        isLoading,
        error,
        loginStudent,
        loginTeacher,
        logout,
        fetchProfile,
        setUser,
        setTeacher,
        setRole,
        setIsLoading,
        setError
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};  