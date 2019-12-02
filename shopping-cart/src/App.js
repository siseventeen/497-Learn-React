//import 'rbx/index.css';
import { Button, Message, } from 'rbx';
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

const App = () => {
  const [data, setData] = useState({}); 
  const [user, setUser] = useState(null);
  /* cartItem: {product:..., size:..., count:...} */
  const [inventory, setInventory] = useState({}); 
  const [curInventory, setCurInventory] = useState({});
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
      if (snap.val()) {
        setInventory(snap.val());
        setCurInventory(snap.val());
        let tempCartItems = {};
        for (const sku in snap.val()) {
          tempCartItems[sku] = {};
          for (const sz in snap.val()[sku]) {
            tempCartItems[sku][sz] = 0;
          }
        }
        setCartItems(tempCartItems);
      }
    }
    const inventoryRef = firebase.database().ref("inventory");
    inventoryRef.on('value', handleData, error => alert(error));
    return () => { inventoryRef.off('value', handleData); };
  }, []);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  

  const handleCartDisplay = function (cart_open) {
    setCartOpen(cart_open);
  };

  
  const handleAddToCart = function (e,productSku,productSize){
    let tempCartItems = {};
    for (const sku in cartItems) {
      tempCartItems[sku] = {};
      for (const sz in cartItems[sku]) {
        tempCartItems[sku][sz] = cartItems[sku][sz];
      }
    }
    let tmpCurInventory = {};
    for (const sku in curInventory) {
      tmpCurInventory[sku] = {};
      for (const sz in curInventory[sku]) {
        tmpCurInventory[sku][sz] = curInventory[sku][sz];
      }
    }
    if(tmpCurInventory[productSku][productSize] > 0){
      tempCartItems[productSku][productSize]++;
      tmpCurInventory[productSku][productSize]--;
    }else{
      // Should not happen, but, alert.
      alert("No more {productSize} size of {productSku} in inventory");
    }
    if(user) {
      firebase.database().ref('carts/' + user.uid).set(tempCartItems).then(()=>{
        console.log("cart write okay");
        setCartItems(tempCartItems);
        setCurInventory(tmpCurInventory);
        setCartOpen(true);
      });
    } else {
      console.log("Not logged in");
      setCartItems(tempCartItems);
      setCurInventory(tmpCurInventory);
      setCartOpen(true);
    }
  };

  const handleRemoveFromCart = function (e,productSku,productSize){
    let tempCartItems = {};
    for (const sku in cartItems) {
      tempCartItems[sku] = {};
      for (const sz in cartItems[sku]) {
        tempCartItems[sku][sz] = cartItems[sku][sz];
      }
    }
    let tmpCurInventory = {};
    for (const sku in curInventory) {
      tmpCurInventory[sku] = {};
      for (const sz in curInventory[sku]) {
        tmpCurInventory[sku][sz] = curInventory[sku][sz];
      }
    }
    if(tempCartItems[productSku][productSize] > 0){
      tempCartItems[productSku][productSize]--;
      tmpCurInventory[productSku][productSize]++;
    }else{
      // Should not happen, but, alert.
      alert("No more {productSize} size of {productSku} in cart");
    }
    if(user) {
      firebase.database().ref('carts/' + user.uid).set(tempCartItems).then(()=>{
        console.log("cart write okay");
        setCartItems(tempCartItems);
        setCurInventory(tmpCurInventory);
        setCartOpen(true);
      });
    } else {
      console.log("Not logged in");
      setCartItems(tempCartItems);
      setCurInventory(tmpCurInventory);
      setCartOpen(true);
    }
  };

  const handleCheckout = function() {
    if(!user) {
      alert("Please login to checkout.");
    } else {
      // Fetch the current inventory agian.
      firebase.database().ref("inventory").once('value').then(function (snap) {
        if(snap.val()) {
          const newInventory = snap.val();
          let checkoutOkay = true;
          for(const sku in cartItems) {
            if(!checkoutOkay) {
              break;
            }
            for(const sz in cartItems[sku]) {
              if(cartItems[sku][sz] > newInventory[sku][sz]) {
                checkoutOkay = false;
                break;
              }
            }
          }
          // Create an empty cart items.
          let tempCartItems = {};
          for(const sku in newInventory) {
            tempCartItems[sku] = {};
            for(const sz in newInventory[sku]) {
              tempCartItems[sku][sz] = 0;
            }
          }

          if(checkoutOkay) {
            let updatedInventory = {};
            for(const sku in newInventory) {
              updatedInventory[sku] = {};
              for(const sz in newInventory[sku]) {
                updatedInventory[sku][sz] = newInventory[sku][sz] - cartItems[sku][sz];
              }
            }
            // We need to clear user cart items and update inventories.
            firebase.database().ref('inventory').set(updatedInventory).then(()=>{
              firebase.database().ref('carts/' + user.uid).set(tempCartItems).then(()=>{
                setInventory(updatedInventory);
                setCurInventory(updatedInventory);
                setCartItems(tempCartItems);
                alert("Checkout succeeded!");
              });
            });
          } else {
            // Reset inventory and curInventory to new value, and clear cart items.
            setInventory(newInventory);
            setCurInventory(newInventory);
            setCartItems(tempCartItems);
            alert("Checkout failed! Cart items exceeds current inventories.");
          }
        } else {
          console.log("Checkout read inventory error.");
        }
      });
    }
  }

  const products = Object.values(data);
  //const inventories = Object.values(inventory);

  const Welcome = ({ user }) => (
    <Message color="info">
      <Message.Header>
        Welcome, {user.displayName}
        <Button variant="primary" onClick={() => firebase.auth().signOut()}>
          Log out
        </Button>
      </Message.Header>
    </Message>
  );

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        firebase.database().ref("carts/"+authResult.user.uid).once('value').then(function (snap) {
          if(snap.val()) {
            const savedCart = snap.val();
            let mergedCart = {};
            let mergeSucceed = true;
            for(const sku in inventory) {
              mergedCart[sku] = {};
              for(const sz in inventory[sku]) {
                mergedCart[sku][sz] = cartItems[sku][sz] + savedCart[sku][sz];
                if( mergedCart[sku][sz] > inventory[sku][sz]) {
                  mergeSucceed = false;
                }
              }
            }
            let finalCart = {};
            if(mergeSucceed) {
              finalCart = mergedCart;
            } else {
              alert("Merge cart failed, will use saved cart.");
              finalCart = savedCart;
            }
            let tmpCurInventory = {};
            for(const sku in inventory) {
              tmpCurInventory[sku] = {};
              for(const sz in inventory[sku]) {
                tmpCurInventory[sku][sz] = inventory[sku][sz] - finalCart[sku][sz];
              }
            }
            setCartItems(finalCart);
            setCurInventory(tmpCurInventory);
            setCartOpen(true);
          } else {
            console.log("Read cart for user error.");
          }
        });
        return false;
      }
    }
  };

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
        <ProductList products = {products} inventories={curInventory} handleAddToCartFunc =  {handleAddToCart}/>
      </div>
      <div className = "col-md-4">
        <Basket cartDisplay={cartOpen} products={data} handleCartDisplayFunc={handleCartDisplay} cartItems = {cartItems} handleRemoveFromCartFunc = {handleRemoveFromCart} handleCheckoutFunc = {handleCheckout}/>
      </div>
    </div>
    </div>
  );
};

export default App;