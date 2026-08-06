import { createContext, useState, useContext, useEffect } from "react";
import { isTokenExpired } from "../utils/tokenUtility";

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTeacher = (teacherData) => {
        setTeacher(teacherData);
    };
   const clearTeacher = () => {
        setTeacher(null);
        setError(null);
    };

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        const role = localStorage.getItem("role");

        if (role === "user") {
            setTeacher(null);
            setRole(role);
            setIsLoading(false);
            return;
        }

        if (!token) {
            setTeacher(null);
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
            const response = await axios.get("/teachers/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("teacher data:", response.data.teacher);
            setUser(response.data.teacher);

        } catch (err) {
            console.error("Error fetching teacher data:", err);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    const value = {
        teacher, setTeacher, isLoading, setIsLoading, error, setError, updateTeacher
    };

    return (
        <TeacherContext.Provider value={value}>
            {children}
        </TeacherContext.Provider>
    );
}