import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to import axios

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [currentState, setCurrentState] = useState('all');

  useEffect(() => {
    getAllOrders()
  }, []);

const getAllOrders=()=>{
  axios
  .get('/admin/orders')
  .then((res) => {
    setOrders(res.data);
    setCurrentState('all');

  })
  .catch((error) => {
    console.error(error);
  })
}


  const getStateOrders = (state) => {
    axios
      .get(`/admin/orders/${state}`)
      .then((response) => {
        setOrders(response.data);
        setCurrentState(state);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="text-center">
        <h1>Product Catalog</h1>
        <div className="category-buttons mt-2">
          <button
            className={`category-button ${currentState === 'all' ? 'active' : ''}`}
            onClick={() => getAllOrders()}
          >
            All
          </button>
          <button
            className={`category-button ${currentState === 'None' ? 'active' : ''}`}
            onClick={() => getStateOrders('None')}
          >
            None
          </button>
          <button
            className={`category-button ${currentState === 'Sended' ? 'active' : ''}`}
            onClick={() => getStateOrders('Sended')}
          >
            Sended
          </button>
          <button
            className={`category-button ${currentState === 'Recieved' ? 'active' : ''}`}
            onClick={() => getStateOrders('Recieved')}
          >
            Recieved
          </button>
          <button
            className={`category-button ${currentState === 'Rejected' ? 'active' : ''}`}
            onClick={() => getStateOrders('Rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      <div className="product-grid mt-4">
        {orders.map((order) => (
          <div className="product-card" key={order.idorder}>
            <div className="product-info">
              <h5 className="product-name">Created at: {order.created_at}</h5>
              <p className="product-price">Client: {order.client}</p>
              <p className="product-price">Phone: {order.phone}</p>
              <p className="product-price">Adress : {order.shipping}</p>
              <p className="product-price">Details : {order.detail}</p>
              <p className="product-price">Total: ${order.t_cost}</p>
              <label htmlFor="state-options">State:</label> {/* Changed 'for' to 'htmlFor' */}
              <select
                id="state-options"
                name="state-options"
                onChange={(e) => {
                  const newState = e.target.value;
                  axios
                    .put(`/admin/orders/${order.idorder}/${newState}`)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <option >{order.state}</option>
                <option value="Sended">Sended</option>
                <option value="Recieved">Recieved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
