import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { useAuth } from './auth.jsx'
function ProfileC() {
 const auth= useAuth()
 const [profile,setProfile]=useState([])
 const [refresh,setRefresh]=useState(false)
 const [phone,setPhone]=useState("")
 const [shipping,setShipping]=useState("")
 useEffect(()=>{
    getUser();
    setPhone(profile.phone)
    setShipping(profile.shipping)
 },[refresh])

const getUser=()=>{
    axios.get(`/client/${auth.user[0].clients_idclient}`)
    .then((res)=>{setProfile(res.data[0]);
})
    .catch((error)=>console.error(error))
}
const update=()=>{
    axios.put(`/client/${auth.user[0].clients_idclient}`,{
        phone: phone || profile.phone, 
        shipping: shipping || profile.shipping
      })
    .then((res)=>{console.log(res);
    setRefresh(!refresh)})
    .catch((error)=>console.error(error))
}
  return (
    <div className="cart-container">
    <div >
            <h5 >Full name: </h5>
            <p className="product-price"> {profile.fullname}</p>
            <h5 >Email: </h5>
            <p className="product-price"> {profile.email}</p>
            <h5 >Phone: </h5>
            <input type="text" placeholder={profile.phone} onChange={(e)=>{if(!e.target.value.length){setPhone(profile.phone)}
                                                                           setPhone(e.target.value)}}/>
            <h5 >Shipping adress: </h5>
            <input type="text" placeholder={profile.shipping} onChange={(e)=>{if(!e.target.value.length){setShipping(profile.shipping)}
                                                                              setShipping(e.target.value)}}/>
            <button className="login-button" onClick={()=>{update()}}>Save changes</button>
    </div>
  </div>
  )
}

export default ProfileC