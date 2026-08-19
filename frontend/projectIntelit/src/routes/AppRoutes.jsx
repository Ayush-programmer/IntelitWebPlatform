import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

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
import Course from '../screens/Course.jsx'
import CourseUpload from '../screens/CourseUpload.jsx'
import EnrollPage from '../screens/EnrollPage.jsx'
import PaymentSuccessPage from '../screens/PaymentSuccessPage.jsx'
import CompleteProfile from '../screens/CompleteProfile.jsx'
import CompleteTeacherProfile from '../screens/CompleteTeacherProfile.jsx'
import NeutralLogout from '../screens/NeutralLogout.jsx';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 3000,
                    style: {
                        borderRadius: '10px',
                    },
                }}
            />
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
                <Route path='/completeprofile' element={<UserProtectedWrapper><CompleteProfile /></UserProtectedWrapper>} />
                <Route path='/updateprofile' element={<UserProtectedWrapper><CompleteProfile /></UserProtectedWrapper>} />
                <Route path='/teacherdashboard' element={<TeacherProtectedWrapper><TeacherDashboard /></TeacherProtectedWrapper>} />
                <Route path="/completeteacherprofile" element={<TeacherProtectedWrapper><CompleteTeacherProfile /></TeacherProtectedWrapper>} />
                <Route path="/updateteacherprofile" element={<TeacherProtectedWrapper><CompleteTeacherProfile /></TeacherProtectedWrapper>} />
                <Route path='/course/:courseId' element={<Course />} />
                <Route path='/uploadcourse' element={<TeacherProtectedWrapper><CourseUpload /></TeacherProtectedWrapper>} />
                <Route path='/editcourse/:courseId' element={<TeacherProtectedWrapper><CourseUpload /></TeacherProtectedWrapper>} />
                <Route path='/enroll/:id' element={<UserProtectedWrapper><EnrollPage /></UserProtectedWrapper>} />
                <Route path='/payment-success/:courseId' element={<UserProtectedWrapper><PaymentSuccessPage /></UserProtectedWrapper>} />
                <Route path='/logout' element={<NeutralLogout />} />
            </Routes>
        </BrowserRouter >
    )
}

// remove older logouts

export default AppRoutes