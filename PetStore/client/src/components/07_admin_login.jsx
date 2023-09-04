import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function AdminLogin() {
  const navigate= useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error, setError] = useState("");
const login=()=>{
  axios.post('/auth/login_admin',{email,password})
  .then((res)=>{
    console.log(res)
    navigate('/admin')})
  .catch((error)=>{ if (error.response) {
    setError(error.response.data.message); // Set the error message from the response
  } else {
    setError("An error occurred. Please try again later."); // Handle network errors
  }
    });
  }
  return (
      <div className="center-screen">
        <div className="login-container">
          <button className="back-button" onClick={()=>{navigate("/")}}>Go to client interface</button>
          <div className="title">Hello admin!</div>
          <p className="paragraph">Welcome Back, You've Been Missed!</p>
          <input type="text" placeholder="Email Address" onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
          {error && <p style={{color:"red"}} className="error-message">{error}</p>} {/* Display error message if it exists */}
          <button className="login-button" onClick={()=>{login()}}>Login</button>
        </div>
      </div>
  )
}

export default AdminLogin