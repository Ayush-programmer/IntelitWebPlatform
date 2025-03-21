import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login.jsx'
import Register from '../screens/Register.jsx'
import About from '../screens/About.jsx'
import Contact from '../screens/Contact.jsx'
import BrowseCourses from '../screens/BrowseCourses.jsx'
import Home from '../screens/Home.jsx'
import TeacherLogin from '../screens/TeacherLogin.jsx'
import TeacherRegister from '../screens/TeacherRegister.jsx'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/browsecourses" element={<BrowseCourses />} />
                <Route path="/contact" element={<Contact />} />
                <Route path='/teacherlogin' element={<TeacherLogin />} />
                <Route path='/teacherregister' element={<TeacherRegister />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes