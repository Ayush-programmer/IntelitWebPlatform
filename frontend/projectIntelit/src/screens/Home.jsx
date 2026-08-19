import React from 'react'
import { Link } from 'react-router-dom'

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import HeroSection from '../components/Home/HeroSection'
import SmartEduSection from '../components/Home/SmartEduSection'
import TeacherSection from '../components/Home/TeacherSection'
import ReviewSection from '../components/Home/ReviewSection'
import WhyChooseSection from '../components/Home/WhyChooseSection'
import TechStack from '../components/Home/TechStack'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  return (
    <div>
      <div className="app">

        <Navbar />

        <HeroSection />

        <TechStack />

        <SmartEduSection />

        <WhyChooseSection />

        <TeacherSection />

        <ReviewSection />

        <Footer />
      </div>
    </div>
  )
}
export default Home