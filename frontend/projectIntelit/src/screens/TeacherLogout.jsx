import React from 'react'
import axios from '../config/axios.js'
import { useNavigate } from 'react-router-dom';
import { TeacherContext } from '../context/Teacher.context.jsx';

const TeacherLogout = () => {
    const { teacher, setTeacher } = useContext(TeacherContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(`/teachers/logout`).then((response) => {
        if (response.status === 200) {
            setTeacher(null);
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            navigate('/teacherlogin');
        }
    })
  return (
    <div>UserLogout</div>
  )
}

export default TeacherLogout