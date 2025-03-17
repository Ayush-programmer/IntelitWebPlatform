import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div class="loginApp">
        <div class="container">
            <div class="form-container">
                <h2>Login to Intelit</h2>
                <form action="#" method="post">
                    <label for="username" class="text-mute">Username :</label>
                    <input type="text" id="username" name="username" required />

                    <label for="password"  class="text-mute">Password :</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit" class="btn-primary-col">Login</button>
                    <p class="register-link text-mute">Don't have an account?<Link to='/register'>SignUp here</Link></p>
                </form>
            </div>
            <div class="image-container">
                <img src="./images/pexels-artempodrez-8512381.jpg" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Login