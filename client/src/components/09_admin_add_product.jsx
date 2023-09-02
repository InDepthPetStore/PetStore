import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminAddProduct() {
  const navigate =  useNavigate ()

  return (
  <div class="center-screen">
      <div class="signup-container">
        <div class="title">Create New Product</div>
        <input type="text" placeholder="Product Name"/>

        <input type="text" placeholder="Price"/>
        <input type="text" placeholder="Stock"/>
        <button class="login-button" onClick={()=>{navigate("/client")}}>Sign Up</button>
      </div>
  </div>
  )
}

export default AdminAddProduct