import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth.jsx';

function ClientStore() {
  const auth = useAuth()
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [error, setError] = useState("");
const [actualP, setActualP]=useState(null)

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(()=>{
    if(actualP){
      console.log(actualP,"     ",auth.user[0])
      addToCart(actualP)
    }
  },[actualP])


  const getAllProducts = () => {
    axios.get('/client/store') 
      .then((response) => {
        setProducts(response.data);
        setCurrentCategory('all');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCategoryProducts = (category) => {
    axios.get(`/client/store/${category}`) 
      .then((response) => {
        setProducts(response.data);
        setCurrentCategory(category);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addToCart = (a) => {
  axios.post('/client/store',{p_image: a.image, p_name: a.name, quantity:1, cost:a.price, products_idproduct: a.idproduct, cart_idcart: auth.user[0].idcart, cart_clients_idclient: auth.user[0].clients_idclient})
  .then((res)=>{
    console.log(res)})
  .catch((error)=>{ if (error.response) {
    setError(error.response.data.message); // Set the error message from the response
  } else {
    setError("An error occurred. Please try again later."); // Handle network errors
  }
    });
  }

  return (
      <div className="container mt-4">
        <div className="text-center">
          <h1>Product Catalog</h1>
          <div className="category-buttons mt-2">
            <button
              className={`category-button ${currentCategory === 'all' ? 'active' : ''}`}
              onClick={getAllProducts}
            >
              All
            </button>
            <button
              className={`category-button ${currentCategory === 'pets' ? 'active' : ''}`}
              onClick={() => getCategoryProducts('pets')}
            >
              Pets
            </button>
            <button
              className={`category-button ${currentCategory === 'food' ? 'active' : ''}`}
              onClick={() => getCategoryProducts('food')}
            >
              Food
            </button>
            <button
              className={`category-button ${currentCategory === 'accessories' ? 'active' : ''}`}
              onClick={() => getCategoryProducts('accessories')}
            >
              Accessories
            </button>
          </div>
        </div>
  
        <div className="product-grid mt-4">
          {products.map((product) => (
            <div className="product-card" key={product.idproduct}>
              <img className="product-image" src={product.image}  alt={product.name} />
              <div className="product-info">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">Price: ${product.price}</p>
                {error && <p style={{color:"red"}} className="error-message">{error}</p>} {/* Display error message if it exists */}
                <button className="add-to-cart-button" onClick={() => {setActualP(product)}}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default ClientStore;