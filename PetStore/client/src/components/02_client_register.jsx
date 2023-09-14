import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from './auth.jsx'
function ClientRegister() {
  const navigate =  useNavigate ()
  const [fullname,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const [shipping,setShipping]=useState("")
  const [error, setError] = useState("");
  const auth = useAuth()



  const register=()=>{
    axios.post('/auth/register_client',{fullname,email,password,phone,shipping})
    .then((res)=>{
            axios.get(`/client/ids/${res.data.userId}`)
              .then((response)=>{
                auth.login(response.data)
                navigate("/client", {replace:true})
              })
              .catch((error)=>{console.error(error)})
            })
    .catch((error)=>{ if (error.response) {
      setError(error.response.data.message); // Set the error message from the response
    } else {
      setError("An error occurred. Please try again later."); // Handle network errors
    }
      });
    }
  

  return (
<div className="center-screen">
  <div className="signup-container">
    <button className="back-button" onClick={()=>{navigate("/")}}>Back</button>
    <div className="title">Create Your Account</div>
    <input type="text" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
    <input type="text" placeholder="Email Address" onChange={(e)=>{setEmail(e.target.value)}}/>
    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
    <input type="text" placeholder="Phone" onChange={(e)=>{setPhone(e.target.value)}}/>
    <input type="text" placeholder="Shipping Address" onChange={(e)=>{setShipping(e.target.value)}}/>
    {error && <p style={{color:"red"}} className="error-message">{error}</p>} {/* Display error message if it exists */}
    <button className="login-button" onClick={()=>{register()}}>Sign Up</button>
  </div>
</div>
  )
}

export default ClientRegister