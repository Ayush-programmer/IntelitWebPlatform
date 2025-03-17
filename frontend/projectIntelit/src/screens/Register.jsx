import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div class="signUpApp">
        <div class="container">
            <div class="left">
            </div>

            <div class="right">
                <h2>SignUp On Intelit</h2>
                <form>
                    <label for="username" class="text-mute">Username</label>
                    <input type="text" id="username" name="username" required />

                    <label for="email" class="text-mute">Email</label>
                    <input type="email" id="email" name="email" required />

                    <label for="password" class="text-mute">Password</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit" class="btn-primary-col">Sign Up</button>

                    <p class="login-link text-mute">Already have an account?<Link to='/login'>Login</Link></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register