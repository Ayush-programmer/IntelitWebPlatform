import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherProtectedWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [teacher, setTeacher] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (!token || role != 'teacher') {
            navigate('/teacherlogin');
            return;
        }

        axios.get(`/teachers/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                setTeacher(response.data.teacher);
                setIsLoading(false);
            }
        }).catch(err => {
            console.log(err);
            navigate('/teacherlogin');
        });
    }, [token, navigate]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>{children}</>
    );
};

export default TeacherProtectedWrapper;