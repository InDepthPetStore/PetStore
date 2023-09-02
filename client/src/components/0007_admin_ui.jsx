import React from 'react'
import Navbar from './007_navbar_admin.jsx'
import { Outlet } from 'react-router-dom'

function AdminUi() {
  return (<>  
  <Navbar/> 
  <Outlet/>
  </>
  )
}

export default AdminUi