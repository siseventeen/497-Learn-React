import React, { useEffect, useState } from 'react';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";

 

const App = () => {
  const [data, setData] = useState({}); 
  const [cartItems, setCartItems] = useState([]);
  
  ////
  const handleAddToCart = function (e,product){
    let cartProducts = [];
      let productAlreadyInCart = false;
      cartItems.forEach(item =>{
        if(item.product.sku==product.sku) {
          productAlreadyInCart = true;
          item.count++;
        }
        cartProducts.push(item);
      });
      if (!productAlreadyInCart){
        cartItems.push({product,count:1});
      }
      setCartItems(cartProducts);
  };

  const handleRemoveFromCart = function (e,product){
    let cartProducts = [];
      cartItems.forEach(item =>{
        if(item.product.sku !== product.sku) {
          cartProducts.push(item);
        }
      });
      setCartItems(cartProducts);
  };
  


  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return(
    <div className = "container">
    <h1>T-shirt Shopping Cart</h1>
    <hr/>
    <div className = "row">
      <div className = "col-md-8">
        <ProductList products = {products} handleAddToCartFunc = {handleAddToCart}/>
      </div>
      <div className = "col-md-4">
        <Basket cartItems = {cartItems} handleRemoveFromCart = {handleRemoveFromCart}/>
      </div>
    </div>
    </div>
  );
};

export default App;