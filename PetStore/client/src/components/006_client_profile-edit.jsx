import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClientEdit() {
  const navigate = useNavigate()
  return (
<div >
  <div class="signup-container">
    <input type="text" placeholder="Full Name"/>
    <input type="text" placeholder="Email Address"/>
    <input type="password" placeholder="Password"/>
    <input type="text" placeholder="Phone"/>
    <input type="text" placeholder="Shipping Address"/>
    <button class="login-button" onClick={()=>{navigate("/client")}}>Save Changes</button>
  </div>
</div>  )
}

export default ClientEdit