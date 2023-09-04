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


    const logout=()=>{
      axios.post('/auth/login_client')
      .then((res)=>{
        console.log(res)
        navigate('/client')})
      .catch((error)=>{ if (error.response) {
        setError(error.response.data.message); // Set the error message from the response
      } else {
        setError("An error occurred. Please try again later."); // Handle network errors
      }
        });
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
            
            <button className='start-button_H' onClick={()=>{navigate("/")}}>
            Logout
            </button>
    </nav>
  </div>
</div>

  );
};

export default Navbar;