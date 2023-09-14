import { Navigate } from "react-router-dom";
import { useAuth } from "./auth.jsx";
import React from 'react'

function RequireAuth({children}) {
    const auth =useAuth()
    if(!auth.user){
     return   <Navigate to ="/client_login" />
    }
  return children
}

export default RequireAuth;