import React, { useEffect, useState } from 'react';


const Basket = ({cartItems, handleRemoveFromCartFunc}) => {	
	const [cartDisplay,setCartDisplay] = useState(false); 
	
	const countMoney = ({cartItems})=>{
		let totalMoney = 0;
		cartItems.forEach(item =>{
			totalMoney += item.product.price * item.count;});
		return totalMoney;
	}

		if (cartDisplay) {
			return(
			<div>	
			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <span> You have {cartItems.length} products. </span>}
			<button className = "btn btn-default" onClick = {()=>setCartDisplay(false)}>Close</button>
			</div>

			<div className = 'alert alert-info'>
			
			{cartItems.length > 0 &&
				<div>
					<ul>
						{cartItems.map( item =>
							<li key={`${item.product.sku}_${item.size}`}>
								<b>{item.product.title} {item.size}</b>
								X<b>{item.count}</b>
								<button className="btn btn-danger"
								onClick = {(e) => handleRemoveFromCartFunc(e,item.product,item.size)}
								>X</button>

							</li>)}
					</ul>
					<div>Totoal: $ {countMoney({cartItems})}</div>
				</div>
			}
			</div>
			</div>

			)}
		else {
			return(
			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <span> You have {cartItems.length} products. </span>}
			<button className = "btn btn-default"  onClick = {()=>setCartDisplay(true)}>Open</button>
			</div>
			)}

}

export default Basket;