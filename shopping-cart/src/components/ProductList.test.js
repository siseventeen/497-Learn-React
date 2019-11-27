import React, {  useState } from 'react';

const ProductList = ({products, inventories, handleAddToCartFunc}) => (
    <div>
      {products.map(product => <Product key={product.sku} product={product} inventory={inventories === undefined ? undefined : inventories[product.sku]} handleFunc={handleAddToCartFunc} />)}
    </div>
    );
  
const Product = ({product, inventory, handleFunc}) => {

  const renderDropdown = () =>{
    let inventoryRemoveEmpty = {};
    if (inventory !== undefined) {
      Object.keys(inventory).forEach(size => {
        if (inventory[size] > 0) {
          inventoryRemoveEmpty[size] = inventory[size];
        }
      });
    } 
    if (inventory === undefined || Object.keys(inventoryRemoveEmpty).length === 0) {
      return (
        <div>
          <div className="form-group">
            <p>All sold out!</p>
          </div>
          <b>{`$${product.price} `}</b>
          <button className="btn btn-primary" disabled={true}>Add to Card</button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="form-group">
            <select className="form-control" id={`${product.sku}-size-select`}>
              {Object.keys(inventoryRemoveEmpty).map(size => <option key={size} value={size}>{size}: {inventoryRemoveEmpty[size]} in inventory</option>)}
            </select>
          </div>
          <b>{`$${product.price} `}</b>
          <button className="btn btn-primary"
            onClick={(e) => handleFunc(e, product, document.getElementById(`${product.sku}-size-select`).value)}>Add to Card</button>
        </div>);
    }
  };
  
 {/*
  const [productSize, setProductSize] = useState('S');

  const handleSizeChange = select_id => {
    setProductSize(document.getElementById(select_id).value);
  };

  const checkInventory =() =>{
    let inventorySize =[];
    if (inventory[product.sku]['S']>0) {
      inventorySize.push("S");
    }
    if (inventory[product.sku]['M']>0) {
      inventorySize.push("M");
    }
    if (inventory[product.sku]['L']>0) {
      inventorySize.push("L");
    }
    if (inventory[product.sku]['XL']>0) {
      inventorySize.push("XL");
    }

    return inventorySize;
  }
  */}

  


  return(
    <div className = "col-md-4">
    <div className = "thumbnail text-center">
      {/* <a href = {"#${product.id}"} onClick = {(e) => this.props.handleAddToCard(e,product)} */}
        <img src= {`./data/products/${product.sku}_1.jpg`} alt = {product.title} />
        <h5>
          {product.title}
        </h5>
        <div>
        {renderDropdown()}
        </div>  

         {/*
        <div className="form-group">
          <select className="form-control" id={`${product.sku}-size-select`} onChange={()=>handleSizeChange(`${product.sku}-size-select`)}>
          if (inventory[product.sku]['S']>0) {<option value='S'>S</option>}
          if (inventory[product.sku]['M']>0) {<option value='M'>M</option>}
          if (inventory[product.sku]['L']>0) {<option value='L'>L</option>}
          if (inventory[product.sku]['XL']>0) {<option value='XL'>XL</option>}
          </select>
      </div>
          <b>{`$${product.price} `}</b>
          <button className = "btn btn-primary"
          onClick = {(e) => handleFunc(e,product,productSize)}>Add to Card</button>
        </div>
       */}
      </div> 
    </div>   
  )};


export default ProductList;