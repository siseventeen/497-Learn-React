import React, { useEffect, useState } from 'react';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";


const App = () => {
  const [data, setData] = useState({}); 
  const [cartItems, setCartItems] = useState({});  
  //const [cartItems, setCartItems] = useState(0); 
  
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
        <ProductList products = {products} />
      </div>
      <div className = "col-md-4">
        <Basket cartItems = {cartItems}/>
      </div>
    </div>
    </div>
  );
};

export default App;