import React, {  useState } from 'react';

const ProductList = ({products, handleAddToCartFunc}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} handleFunc={handleAddToCartFunc} />)}
    </div>
    );
  
const Product = ({product, handleFunc}) => {
  const [productSize, setProductSize] = useState('S');

  const handleSizeChange = select_id => {
    setProductSize(document.getElementById(select_id).value);
  };

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
          <select className="form-control" id={`${product.sku}-size-select`} onChange={()=>handleSizeChange(`${product.sku}-size-select`)}>
          <option value='S'>S</option>
          <option value='M'>M</option>
          <option value='L'>L</option>
          <option value='XL'>XL</option>
          </select>
      </div>
          <b>{`$${product.price} `}</b>
          <button className = "btn btn-primary"
          onClick = {(e) => handleFunc(e,product,productSize)}>Add to Card</button>
        </div>
      {/* </a> */}
    </div> 
    </div>   
  )};


export default ProductList;