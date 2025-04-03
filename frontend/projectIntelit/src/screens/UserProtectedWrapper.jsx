import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/user.context.jsx'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role')
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || role != 'student') {
            navigate('/login');
        }
    }, [token])

    return (
        <>{children}</>
    )
    
}

export default UserProtectedWrapper