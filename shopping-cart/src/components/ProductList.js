import React, {  useState } from 'react';

const ProductList = ({products, handleAddToCartFunc}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} handleFunc={handleAddToCartFunc} />)}
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
        <div className="form-group">
          <select className="form-control">
          <option key='S' onClick = {()=> setProductSize('S')}>S</option>
          <option key='M' onClick = {()=> setProductSize('M')}>M</option>
          <option key='L' onClick = {()=> setProductSize('L')}>L</option>
          <option key='XL' onClick = {()=> setProductSize('XL')}>XL</option>
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