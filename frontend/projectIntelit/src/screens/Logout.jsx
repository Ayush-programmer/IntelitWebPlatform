import React, { useContext } from 'react'
import axios from '../config/axios.js'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context.jsx';

const Logout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    axios.get(`/users/logout`).then((response) => {
        if (response.status === 200) {
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/login');
        }
    }).catch((error) => {
        console.error("Logout error:", error);
    });
    return (
        <div>UserLogout</div>
    )
}

export default Logout