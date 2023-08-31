import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';

const Navbar = () => {
    const navigate = useNavigate()
    const navbarstyles= ({isActive})=>{
        return {
            textDecoration: "none",
            color: isActive ? 'red' : "black",
            marginRight: "30px"}
    }
  return (
<div class="navbar">
  <div class="left-column">
    <div class="logo">
      <img src="https://res.cloudinary.com/dbrqyjbzd/image/upload/v1692908004/store_logo_jhwho5.png" alt="Logo" width="150"/>
    </div>
  </div>
  <div class="right-column">
    <nav >
            <NavLink exact to="store" style={navbarstyles}  >
            <FaStore />
            </NavLink>
            
            <NavLink to="profile" style={navbarstyles}>
            <FaUser />
            </NavLink>
            
            <NavLink to="cart" style={navbarstyles}>
            <FaShoppingCart />
            </NavLink>
            <button className='start-button_H' onClick={()=>{navigate("/")}}>
            Logout
            </button>
    </nav>
  </div>
</div>

  );
};

export default Navbar;