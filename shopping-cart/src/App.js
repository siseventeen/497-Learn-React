//import 'rbx/index.css';
import { Button, Container, Message, Title } from 'rbx';
import React, { useEffect, useState } from 'react';
import Basket from "./components/Basket";
import ProductList from "./components/ProductList";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyCq3Jeya99El9A3PDuqEKap8yvkzbFLTfw",
  authDomain: "learnreact-43175.firebaseapp.com",
  databaseURL: "https://learnreact-43175.firebaseio.com",
  projectId: "learnreact-43175",
  storageBucket: "learnreact-43175.appspot.com",
  messagingSenderId: "478211285232",
  appId: "1:478211285232:web:30e5bc3cbf7879df726235"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const App = () => {
  const [data, setData] = useState({}); 
  const [user, setUser] = useState(null);
  /* cartItem: {product:..., size:..., count:...} */
  const [inventory, setInventory] = useState({}); 
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();  

  }, []);

  useEffect(()=>{
    const handleData = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  

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

  const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

  const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

  return(
    <div className = "container">
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <h1>T-shirt Shopping Cart</h1>
    <hr/>
    <div className = "row">
      <div className = "col-md-8">
        <ProductList products = {products} inventories={inventory} handleAddToCartFunc =  {handleAddToCart}/>
      </div>
      <div className = "col-md-4">
        <Basket cartDisplay={cartOpen} handleCartDisplayFunc={handleCartDisplay} cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart}/>
      </div>
    </div>
    </div>
  );
};

export default App;