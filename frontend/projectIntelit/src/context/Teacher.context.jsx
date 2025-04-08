import { createContext, useState, useContext } from "react";

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

    const value = {
        teacher, setTeacher, isLoading, setIsLoading, error, setError, updateTeacher
    };

    return (
        <TeacherContext.Provider value={value}>
            {children}
        </TeacherContext.Provider>
    );
}