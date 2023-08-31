import React from 'react'
import Navbar from './002_navbar_client.jsx'
import { Outlet } from 'react-router-dom'

function ClientUi() {
  return (<>  
  <Navbar/> 
  <Outlet/>
  </>
  )
}

export default ClientUi