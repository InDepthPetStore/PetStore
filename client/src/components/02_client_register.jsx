import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClientRegister() {
  const navigate =  useNavigate ()

  return (
<div class="center-screen">
  <div class="signup-container">
    <button class="back-button" onClick={()=>{navigate("/")}}>Back</button>
    <div class="title">Create Your Account</div>
    <input type="text" placeholder="Full Name"/>
    <input type="text" placeholder="Email Address"/>
    <input type="password" placeholder="Password"/>
    <input type="text" placeholder="Phone"/>
    <input type="text" placeholder="Shipping Address"/>
    <button class="login-button" onClick={()=>{navigate("/client")}}>Sign Up</button>
  </div>
</div>
  )
}

export default ClientRegister