import React, { useEffect, useState } from 'react';
import { useAuth } from './auth.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ClientCart = () => {
const [cItems, setCItems]= useState([])
const [refresh, setRefresh]= useState(false)
// const [finishing, setFinishing]= useState(false)

const [total, setTotal]= useState(0)
const [purchase , setPurchase] = useState('')
const auth = useAuth()
const navigate= useNavigate()
useEffect(() => {
  cartItems();
}, [refresh]);

useEffect(() => {
  const newTotal = cItems.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
  setTotal(newTotal);
}, [cItems]);

useEffect(() => {
  const recap = cItems.reduce((acc, item) => acc + `### Product: ${item.p_name} | Quantity: ${item.quantity} | Cost: ${item.cost*item.quantity} \n
  `, '');
  setPurchase(recap);
}, [cItems]); 

  const cartItems = () => {
    axios.get(`/client/cart/${auth.user[0].idcart}`) 
      .then((response) => {
        setCItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Del = (i) => {
    
    axios.delete(`/client/cart/${i}/${auth.user[0].clients_idclient}`) 
      .then((response) => {
        setRefresh(!refresh)
  console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="cart-container">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cItems.map((item) =>{ 

            return (
            <tr key={item.products_idproduct}>
              <td>
                <img className='imge' src={item.p_image} alt={item.p_name} />
              </td>
              <td>{item.p_name}</td>
              <td>
                <input 
                  type="number"
                  placeholder={item.quantity}
                  onChange={(e) => {
                    const newQuantity = e.target.value;
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                              axios.put(`/client/cart/${item.products_idproduct}/${auth.user[0].clients_idclient}`,{ quantity: newQuantity })
                              .then((response) => {
                                console.log(response)
                                setRefresh(!refresh)
                              })
                              .catch((error) => {
                                console.error(error);
                              });
                       };
                              }}
                  />
              </td>
              <td>${item.cost * item.quantity}</td>
              <td>
                <button className='remove-button' onClick={()=>{Del(item.products_idproduct); setRefresh(!refresh)}}>
                  Remove
                </button>
              </td>
            </tr>
            
          )})}
        </tbody>
      </table>
      <div>Total Cost: {total}</div> {/* Calculate and display the total cost */}
      {cItems.length>0 && <button className="login-button" onClick={()=>{
        axios.post(`/client/purchase/${auth.user[0].clients_idclient}`,{detail: purchase, t_cost:total})
        .then((res)=>{
              console.log(res)
              axios.delete(`/client/cart_del/${auth.user[0].clients_idclient}`) 
              .then((response) => {
                  console.log(response)
                  navigate("/client/order")
              })
              .catch((error) => {
                  console.error(error);
              });
        })
        .catch((error)=>{console.error(error)})
      }}>Purchase</button>}

    </div>
  );
};


export default ClientCart;
