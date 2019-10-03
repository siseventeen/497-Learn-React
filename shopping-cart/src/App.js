import React, { useEffect, useState } from 'react';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";

 

const App = () => {
  const [data, setData] = useState({}); 
  /* cartItem: {product:..., size:..., count:...} */
  const [cartItems, setCartItems] = useState([]);

  
  const handleAddToCart = function (e,product,productSize){
    let tempCartItems = [];
      let itemAlreadyInCart = false;
      cartItems.forEach(item =>{

        // how to get the product.size 
        if((item.product.sku === product.sku) && (item.size === productSize)){
          itemAlreadyInCart = true; 
          item.count++;
        }
        tempCartItems.push(item);
      });
      if (!itemAlreadyInCart){
        tempCartItems.push({product,count:1,size:productSize});
      }
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(tempCartItems);
  };



  const handleRemoveFromCart = function (e,product,productSize){
    let tempCartItems = [];
      cartItems.forEach(item =>{
        if(item.product.sku !== product.sku || item.size != productSize) {
          tempCartItems.push(item);
        }
      });
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(tempCartItems);
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
        <ProductList products = {products} handleAddToCartFunc =  {handleAddToCart}/>
      </div>
      <div className = "col-md-4">
        <Basket cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart}/>
      </div>
    </div>
    </div>
  );
};

export default App;