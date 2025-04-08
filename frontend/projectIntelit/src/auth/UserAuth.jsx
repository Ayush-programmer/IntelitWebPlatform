import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user.context.jsx'
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js'

const UserAuth = ({ children }) => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await axios.get('/users/profile');
                    setUser(response.data.user);
                    
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        };

        fetchUserData();
    }, [token, navigate, setUser]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserAuth