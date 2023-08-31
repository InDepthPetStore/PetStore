import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
      
      function ClientProfile() {
        const navigate = useNavigate()
          const [isView, setIsView] =  useState(false);
          const [isEdit, setIsEdit] =  useState(false);
        
          const toggleView = () => {
            setIsView(true);
            setIsEdit(false)
          };
          const toggleEdit = () => {
            setIsView(false);
            setIsEdit(true)
          };
        return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', height: '100vh' }}>
      <h1>Your Profile</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button className={isView ? "profile-button": 'back-button'} onClick={()=>{toggleView();navigate("view")}} >View</button>
        <button className={isEdit ? "profile-button": 'back-button'} onClick={()=>{toggleEdit();navigate("edit")}}>Edit</button>
      </div>
      <Outlet />
    </div>
        )
      }
      
      export default ClientProfile