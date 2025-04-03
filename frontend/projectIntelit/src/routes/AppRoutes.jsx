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
import UserDashboard from '../screens/UserDashboard.jsx'
import TeacherDashboard from '../screens/TeacherDashboard.jsx'
import UserProtectedWrapper from '../screens/UserProtectedWrapper.jsx'
import TeacherProtectedWrapper from '../screens/TeacherProtectedWrapper.jsx'

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
                <Route path='/userdashboard' element={<UserProtectedWrapper><UserDashboard /></UserProtectedWrapper>} />
                <Route path='/teacherdashboard' element={<TeacherProtectedWrapper><TeacherDashboard /></TeacherProtectedWrapper>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes