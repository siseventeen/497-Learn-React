import React, { useEffect, useState } from 'react';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";

 

const App = () => {
  const [data, setData] = useState({}); 
  /* cartItem: {product:..., size:..., count:...} */
  const [inventory, setInventory] = useState({}); 
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartDisplay = function (cart_open) {
    setCartOpen(cart_open);
  };

  
  const handleAddToCart = function (e,product,productSize){
    let tempCartItems = [];
      let itemAlreadyInCart = false;

      cartItems.forEach(item =>{

        // how to get the product.size 
        if((item.product.sku === product.sku) && (item.size === productSize)) {
          itemAlreadyInCart = true; 
          if(inventory[product.sku][productSize] > 0){
          item.count++;
          inventory[product.sku][productSize]--;
        }else{
          alert("No more {productSize} size of {product.title} in inventory");
        }}
        tempCartItems.push(item);
      });
      if (!itemAlreadyInCart){
        if (inventory[product.sku][productSize] > 0){
        tempCartItems.push({product:product,count:1,size:productSize});
        inventory[product.sku][productSize]--;
      }else{
        alert("No more {productSize} size of {product.title} in inventory");
      }
      }
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(tempCartItems);
      setCartOpen(true);
  };

  const handleRemoveFromCart = function (e,product,productSize){
    let tempCartItems = [];
      cartItems.forEach(item =>{
        if(item.product.sku !== product.sku || item.size != productSize) {
          tempCartItems.push(item);
        }else {
          inventory[product.sku][productSize]++;
          if(item.count > 1) {
            item.count -= 1;
            tempCartItems.push(item);
          }
        }
      });
      // localStorage.setItem("cartItems",JSON.stringify(cartItems));
      setCartItems(tempCartItems);
  };

  const products = Object.values(data);
  //const inventories = Object.values(inventory);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setInventory(json);
    };
    fetchInventory();
  }, []);

  return(
    <div className = "container">
    <h1>T-shirt Shopping Cart</h1>
    <hr/>
    <div className = "row">
      <div className = "col-md-8">
        <ProductList products = {products} inventory={inventory} handleAddToCartFunc =  {handleAddToCart}/>
      </div>
      <div className = "col-md-4">
        <Basket cartDisplay={cartOpen} handleCartDisplayFunc={handleCartDisplay} cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart}/>
      </div>
    </div>
    </div>
  );
};

export default App;