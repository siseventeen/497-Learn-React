import React, { useEffect, useState } from 'react';

const ProductList = ({products}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} />)}
    </div>
    );
  
const Product = ({product}) => (
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
      {/* </a> */}
    </div> 
    </div>   
  );


export default ProductList;