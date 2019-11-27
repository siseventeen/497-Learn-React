import React from 'react';

const ProductList = ({ products, inventories, handleAddToCartFunc }) => (
  <div>
    {products.map(product => <Product key={product.sku} product={product} inventory={inventories === undefined ? undefined : inventories[product.sku]} handleFunc={handleAddToCartFunc} />)}
  </div>
);

const Product = ({ product, inventory, handleFunc }) => {

  const renderDropdownAndButton = function () {
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

  return (
    <div className="col-md-4">
      <div className="thumbnail text-center">
        {/* <a href = {"#${product.id}"} onClick = {(e) => this.props.handleAddToCard(e,product)} */}
        <img src={`./data/products/${product.sku}_1.jpg`} alt={product.title} />
        <h5>
          {product.title}
        </h5>
        {renderDropdownAndButton()}
        {/* </a> */}
      </div>
    </div>
  )
};


export default ProductList;