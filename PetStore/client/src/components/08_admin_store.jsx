import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminStore() {
  const[refresh, setRefresh]= useState(false)
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const navigate=useNavigate()


  useEffect(() => {
    getAllProducts();
  }, [refresh]);

  const getAllProducts = () => {
    axios.get('/admin/products') 
      .then((response) => {
        setProducts(response.data);
        setCurrentCategory('all');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getCategoryProducts = (category) => {
    axios.get(`/admin/products/${category}`) 
      .then((response) => {
        setProducts(response.data);
        setCurrentCategory(category);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Del = (idproduct) => {
    axios.delete(`/admin/products/${idproduct}`) 
      .then((response) => {
  console.log(response)
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
              <img src={product.image} className="product-image" alt={product.name} />
              <div className="product-info">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">Price: ${product.price}</p>
                <button className="add-to-cart-button" onClick={() => {Del(product.idproduct),setRefresh(!refresh)} }>delete</button>
                <button className="add-to-cart-button" onClick={()=>{navigate(`product_details/${product.idproduct}`,{state:product})}}>update</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default AdminStore;