import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/Loaders/Loader.jsx';

const TeacherProtectedWrapper = ({ children }) => {
    const { teacher, role, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />
    }

    console.log(role);
    
    if (role !== 'teacher' || !teacher) {
        return <Navigate to='/teacherlogin' replace />
    }

    return <>{children}</>;
};

export default TeacherProtectedWrapper;