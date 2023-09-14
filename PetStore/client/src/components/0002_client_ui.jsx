import React from 'react'
import Navbar from './002_navbar_client.jsx'
import { Outlet} from 'react-router-dom'
// import { useAuth } from './auth.jsx';

function ClientUi() {
  // const auth =useAuth()
  // console.log(auth.user)
  return (<>  
  <Navbar /> 
  <Outlet />
  </>
  )
}

export default ClientUi