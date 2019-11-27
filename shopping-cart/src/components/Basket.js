import React, { useEffect, useState } from 'react';


const Basket = ({cartDisplay, handleCartDisplayFunc, cartItems, handleRemoveFromCartFunc}) => {	
	//const [cartDisplay,setCartDisplay] = useState(false); 
	
	const countMoney = ({cartItems})=>{
		let totalMoney = 0;
		cartItems.forEach(item =>{
			totalMoney += item.product.price * item.count});
		return totalMoney;
	}

	const countItem = ({cartItems}) => {
		let totalItem = 0;
		cartItems.forEach(item =>{
			totalItem += item.count});
		return totalItem
	}

		if (cartDisplay) {
			return(
			<div>	
			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <span> You have {countItem({cartItems})} items. </span>}
			<button className = "btn btn-default" onClick = {()=>handleCartDisplayFunc(false)}>Close</button>
			</div>

			<div className = 'alert alert-info'>
			
			{cartItems.length > 0 &&
				<div>
					<ul>
						{cartItems.map( item =>
							<li key={`${item.product.sku}_${item.size}`}>
								<b>{item.product.title} {item.size} </b>
								 X <b> {item.count}</b>
								<button className="btn btn-danger"
								onClick = {(e) => handleRemoveFromCartFunc(e,item.product,item.size)}
								>X</button>

							</li>)}
					</ul>
					<div>Totoal: $ {countMoney({cartItems}).toFixed(2)}</div>
				</div>
			}
			</div>
			</div>

			)}
		else {
			return(
			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" :  <span> You have {countItem({cartItems})} items. </span>}
			<button className = "btn btn-default"  onClick = {()=>handleCartDisplayFunc(true)}>Open</button>
			</div>
			)}

}

export default Basket;