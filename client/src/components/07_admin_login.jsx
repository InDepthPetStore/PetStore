import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
function AdminLogin() {
  const navigate= useNavigate()
  return (
      <div className="center-screen">
        <div className="login-container">
          <button className="back-button" onClick={()=>{navigate("/")}}>Go to client interface</button>
          <div className="title">Hello admin!</div>
          <p className="paragraph">Welcome Back, You've Been Missed!</p>
          <input type="text" placeholder="Email Address"/>
          <input type="password" placeholder="Password"/>
          <button className="login-button" onClick={()=>{navigate("/admin")}}>Login</button>
        </div>
      </div>
  )
}

export default AdminLogin