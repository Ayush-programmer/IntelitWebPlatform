import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/user.context.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';

const UserProtectedWrapper = ({ children }) => {
    const { user, setUser, setIsLoading, setError } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role !== 'student') {
            navigate('/login');
            return;
        }

        if (!user) {
            setIsLoading(true);
            axios.get('/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch((err) => {
                    console.error('Error fetching user profile:', err);
                    setError('Failed to fetch user data');
                    navigate('/login');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [token, role, user, navigate, setUser, setIsLoading, setError]);

    return <>{children}</>;
};

export default UserProtectedWrapper;