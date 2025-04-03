import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './context/user.context'
import { TeacherProvider } from './context/Teacher.context'

function App() {

  return (
    <>
      <UserProvider>
        <TeacherProvider>
          <AppRoutes />
        </TeacherProvider>
      </UserProvider>
    </>
  )
}

export default App
