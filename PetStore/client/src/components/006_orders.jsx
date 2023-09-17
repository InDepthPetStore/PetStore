import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios
import { useAuth } from './auth.jsx';

function OrdersC() {
  const [orders, setOrders] = useState([]);
  const auth =useAuth()

  useEffect(() => {
    getAllOrders()
  }, []);

const getAllOrders=()=>{
  axios
  .get(`/client/orders/${auth.user[0].clients_idclient}`)
  .then((res) => {
    setOrders(res.data);
  })
  .catch((error) => {
    console.error(error);
  })
}

  return (
    <div className="container mt-4">
      <div className="text-center">
        <h1>Your orders</h1>
      </div>

      <div className="product-grid mt-4">
        {orders.map((order) => (
          <div className="product-card" key={order.idorder}>
            <div className="product-info">
              <h5 className="product-name">Created at: {order.created_at}</h5>
              <label >Details:</label><p className="product-price"> {order.detail}</p>
              <label >Total: $</label><p className="product-price">{order.t_cost}</p>
              <label >State:</label><p className="product-price">{order.state}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersC;
