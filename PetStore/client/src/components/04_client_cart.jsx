import React, { useState } from 'react';

const ClientCart = (props) => {
const [cItems, setCItems]= useState([])
const ids =props.ids


useEffect(() => {
  cartItems();
}, []);


  const cartItems = () => {
    axios.get(`/client/cart/${ids.idcart}`) 
      .then((response) => {
        setCItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Function to update the quantity of a product in the cart

  const updateQuantity = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Calculate the total cost of all products in the cart
  const calculateTotalCost = () => {
    let totalCost = 0;
    for (const item of cartItems) {
      const quantity = quantities[item.products_idproduct ] || 0;
      totalCost += item.price * quantity;
    }
    return totalCost;
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cItems.map((item) => (
          <li key={item.products_idproduct }>
            <img src={item.p_image} alt={item.p_name} />
            <div>{item.p_name}</div>
            <div>
              Quantity:
              <button
                onClick={() => updateQuantity(item.products_idproduct , quantities[item.products_idproduct ] - 1)}
              >
                -
              </button>
              {quantities[item.products_idproduct ] || 0}
              <button
                onClick={() => updateQuantity(item.products_idproduct , quantities[item.products_idproduct ] + 1)}
              >
                +
              </button>
            </div>
            <div>Price: ${item.cost*item.quantity}</div>
        
            <div>Total: ${item.price * (quantities[item.products_idproduct ] || 0)}</div>
          </li>
        ))}
      </ul>
      <div>
        Total Cost: ${calculateTotalCost()}
      </div>
    </div>
  );
};

export default ClientCart;
