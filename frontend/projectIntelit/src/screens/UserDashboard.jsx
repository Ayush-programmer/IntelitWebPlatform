import React, { useContext } from 'react'
import { UserContext } from '../context/user.context'

const UserDashboard = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      {
        user && (
          <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
          </div>
        )
      }
    </div>
  )
}

export default UserDashboard