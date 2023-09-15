import React, { useEffect, useState } from 'react';
import { useAuth } from './auth.jsx';
import axios from 'axios';
const ClientCart = () => {
const [cItems, setCItems]= useState([])
const [refresh, setRefresh]= useState(false)

const auth = useAuth()

useEffect(() => {
  cartItems();
}, [refresh]);


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
        setRefresh(true)
  console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Function to update the quantity of a product in the cart

  // const updateQuantity = (productId, newQuantity) => {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: newQuantity,
  //   }));
  // };

  // Calculate the total cost of all products in the cart
  // const calculateTotalCost = () => {
  //   let totalCost = 0;
  //   for (const item of cartItems) {
  //     const quantity = quantities[item.products_idproduct ] || 0;
  //     totalCost += item.price * quantity;
  //   }
  //   return totalCost;
  // };

  return (
    <div className="center-screen">
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
          {cItems.map((item) => (
            <tr key={item.products_idproduct}>
              <td>
                <img className='imge' src={item.p_image} alt={item.p_name} />
              </td>
              <td>{item.p_name}</td>
              <td>
                <input 
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    // Handle quantity change here
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
          ))}
        </tbody>
      </table>
      <div>Total Cost: $XXX</div> {/* Calculate and display the total cost */}
    </div>
  );
};


export default ClientCart;
