import React from 'react'
import Navbar from './002_navbar_client.jsx'
import { Outlet,useLocation } from 'react-router-dom'

function ClientUi() {
  // const location = useLocation();
  // const ids= location.state
  return (<>  
  <Navbar /> 
  <Outlet />
  </>
  )
}

export default ClientUi