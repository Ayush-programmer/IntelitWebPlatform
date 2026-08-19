import React, { useContext, useEffect } from 'react';
import axios from '../config/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/Loaders/Loader.jsx';
import { Navigate } from 'react-router-dom';


const UserProtectedWrapper = ({ children }) => {

    const { user, role, isLoading } = useAuth();

    if (isLoading) {
        return <Loader />
    }

    if (role !== 'student' || !user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default UserProtectedWrapper;