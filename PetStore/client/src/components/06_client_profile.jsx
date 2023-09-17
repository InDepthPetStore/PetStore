import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
      
      function ClientProfile() {
        const navigate = useNavigate()
          const [isView, setIsView] =  useState(true);
          const [isOrder, setIsOrder] =  useState(false);
          const toggleView = () => {
            setIsView(true);
            setIsOrder(false)
          };
          const toggleEdit = () => {
            setIsView(false);
            setIsOrder(true)
          };
        return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', height: '100vh' }}>
      <h1>Your Profile</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button className={isView ? "profile-button": 'back-button'} onClick={()=>{toggleView();navigate("view")}} >View</button>
        <button className={isOrder ? "profile-button": 'back-button'} onClick={()=>{toggleEdit();navigate("orders")}}>Orders</button>
      </div>
      <Outlet />
    </div>
        )
      }
      
      export default ClientProfile