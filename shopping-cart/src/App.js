import React, { useEffect, useState } from 'react';
//import Products from "./components/Products";


const App = () => {
  const [data, setData] = useState({});  
  const products = Object.values(data);

  const Product = products.map( product => (
    <div className = "col-md-4">
      <div className = "thumbnail text-center">
        {/* <a href = {"#${product.id}"} onClick = {(e) => this.props.handleAddToCard(e,product)} */}
          <img src= {`./data/products/${product.sku}_1.jpg`} alt = {product.title} />
          <p>
            {product.title}
          </p>
          <div>
            <div>
            <button className = "btn btn-default"
            >S</button>
            <button className = "btn btn-default"
            >M</button>
            <button className = "btn btn-default"
            >X</button>
            <button className = "btn btn-default"
            >XL</button>
            </div>
            <b>{`$${product.price} `}</b>
            <button className = "btn btn-primary"
            onClick = {(e) => this.props.handleAddToCard(e,product)}>Add to Card</button>
          </div>
        {/*  </a> */}
      </div>
    </div>
    ))

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
      {Product}
      </div>
      <div className = "col-md-4">
      </div>
    </div>
    </div>
  );
};

export default App;