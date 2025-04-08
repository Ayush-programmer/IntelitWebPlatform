import React, { useContext } from 'react'
import { TeacherContext } from '../context/Teacher.context';

const TeacherDashboard = () => {
  const { teacher, setTeacher } = useContext(TeacherContext);

  return (
    <div>
      {teacher && (
      <div>
        <h1>Welcome, {teacher.name}</h1>
        <p>Email: {teacher.email}</p>
      </div>
    ) 
    }
    </div>
  )
}

export default TeacherDashboard