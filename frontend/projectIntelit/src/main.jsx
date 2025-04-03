import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TeacherContext } from './context/Teacher.context.jsx'
import { UserContext } from './context/user.context.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeacherContext>
      <UserContext>
          <App />
      </UserContext>
    </TeacherContext>
  </StrictMode>,
)
