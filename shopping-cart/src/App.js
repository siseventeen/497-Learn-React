import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState({});
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
      <ul>
      {products.map(product => <li key={product.sku}> {product.title} </li>)}
      </ul>
      </div>
      <div className = "col-md-4">
      </div>
    </div>
    </div>
  );
};

export default App;