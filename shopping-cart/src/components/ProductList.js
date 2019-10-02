import React, { useEffect, useState } from 'react';

const ProductList = ({products, handleAddToCartFunc}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} handleFunc={handleAddToCartFunc}/>)}
    </div>
    );
  
const Product = ({product, handleFunc}) => {
	const [productSize, setProductSize] = useState('S');
	return(
  	<div className = "col-md-4">
  	<div className = "thumbnail text-center">
      {/* <a href = {"#${product.id}"} onClick = {(e) => this.props.handleAddToCard(e,product)} */}
        <img src= {`./data/products/${product.sku}_1.jpg`} alt = {product.title} />
        <h5>
          {product.title}
        </h5>
        <div>
        <div class="form-group">
      		<select class="form-control">
       		<option onClick = {()=> setProductSize('S')}>S</option>
        	<option onClick = {()=> setProductSize('M')}>M</option>
        	<option onClick = {()=> setProductSize('L')}>L</option>
        	<option onClick = {()=> setProductSize('XL')}>XL</option>
      		</select>
    	</div>
          <b>{`$${product.price} `}</b>
          <button className = "btn btn-primary"
          onClick = {(e) => handleFunc(e,product)}>Add to Card</button>
        </div>
      {/* </a> */}
    </div> 
    </div>   
  )};


export default ProductList;