import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ClientLogin() {
  const navigate =  useNavigate()

  return (
  <div className="center-screen">
    <div className="login-container">
      <button className="back-button" onClick={()=>{navigate("/")}}>Back</button>
      <div className="title">Hello again!</div>
      <p className="paragraph">Welcome Back, You've Been Missed!</p>
      <input type="text" placeholder="Email Address"/>
      <input type="password" placeholder="Password"/>
      <button className="login-button" onClick={()=>{navigate("/client")}}>Login</button>
      <p className="signup-text">You don't have an account? <Link to="/client_register">Sign Up for free</Link></p>
    </div>
  </div>

  )
}

export default ClientLogin