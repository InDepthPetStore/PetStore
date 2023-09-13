import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function ClientLogin() {
  const navigate =  useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [error, setError] = useState("");
const login=()=>{
  axios.post('/auth/login_client',{email,password})
  .then((res)=>{
    axios.get('/client/ids')
        .then((response)=>{setIds(response)})
        .catch((error)=>{console.error(error)})
    console.log(res)
    navigate('/client', {state:ids})})
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
      <button className="back-button" onClick={()=>{navigate("/")}}>Back</button>
      <div className="title">Hello again!</div>
      <p className="paragraph">Welcome Back, You've Been Missed!</p>
      <input type="text" placeholder="Email Address" onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
      {error && <p style={{color:"red"}} className="error-message">{error}</p>} {/* Display error message if it exists */}
      <button className="login-button" onClick={()=>{login()}}>Login</button>
      <p className="signup-text">You don't have an account? <Link to="/client_register">Sign Up for free</Link></p>
    </div>
  </div>

  )
}

export default ClientLogin