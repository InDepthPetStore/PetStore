import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';
import { useAuth } from './auth.jsx';

const Navbar = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const navbarstyles= ({isActive})=>{
        return {
            textDecoration: "none",
            color: isActive ? 'red' : "black",
            marginRight: "30px"}
    }


    const logout=()=>{
      auth.logout()
      navigate("/",{replace:true})
      }


  return (
<div className="navbar">
  <div className="left-column">
    <div className="logo">
      <img src="https://res.cloudinary.com/dbrqyjbzd/image/upload/v1692908004/store_logo_jhwho5.png" alt="Logo" width="150"/>
    </div>
  </div>
  <div className="right-column">
    <nav >
            <NavLink  to="store" style={navbarstyles}  >
            <FaStore />
            </NavLink>
            
            <NavLink to="profile" style={navbarstyles}>
            <FaUser />
            </NavLink>
            
            <NavLink to="cart" style={navbarstyles}>
            <FaShoppingCart />
            </NavLink>
            
            <button className='start-button_H' onClick={()=>{logout()}}>
            Logout
            </button>
    </nav>
  </div>
</div>

  );
};

export default Navbar;