import React from 'react'
import { useNavigate } from 'react-router-dom'

function ClientOrder() {
    const navigate =useNavigate()
  return (
    <div className="cart-container">
            <div className="title">Thank you for choosing us!</div>
            <p className="paragraph">We're thrilled to confirm your order.<br />
            Your package will be on its way in just 7 days!<br />
            Keep an eye on your profile to track every step of its epic journey!</p>
            <button className="back-button" onClick={()=>{navigate("/client")}}>Continue shopping</button>
    </div>
  )
}

export default ClientOrder