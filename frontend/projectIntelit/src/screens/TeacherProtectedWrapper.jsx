import React, { useContext, useEffect } from 'react';
import { TeacherContext } from '../context/Teacher.context.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';

const TeacherProtectedWrapper = ({ children }) => {
    const { teacher, setTeacher, setIsLoading, setError } = useContext(TeacherContext);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role !== 'teacher') {
            navigate('/teacherlogin');
            return;
        }

        if (!teacher) {
            setIsLoading(true);
            axios.get('/teachers/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => {
                    setTeacher(res.data.teacher);
                })
                .catch((err) => {
                    console.error('Error fetching teacher profile:', err);
                    setError('Failed to fetch teacher data');
                    navigate('/teacherlogin');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [token, role, teacher, navigate, setTeacher, setIsLoading, setError]);

    return <>{children}</>;
};

export default TeacherProtectedWrapper;