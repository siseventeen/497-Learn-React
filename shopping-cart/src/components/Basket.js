import React, { useEffect, useState } from 'react';
import {setCartDisplay} from '../App.js'

const Basket = ({cartItems}) => {	
const [cartDisplay,setCartDisplay] = useState(false); 

		if (cartDisplay) {
			return(
			<div>	
			<div className = 'alert alert-info'>
			<span> Shopping Cart </span>
			<button className = "btn btn-default" onClick = {()=>setCartDisplay(false)}>Close</button>
			</div>

			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <div> You have {cartItems.length} products in your shopping cart. </div>}
			{cartItems.length > 0 &&
				<div>
					<ul>
						{cartItems.map( item =>
							<li key={item.product.sku}>
								<b>{item.product.title} {item.product.size}</b>
								X<b>{item.count}</b>
								<button className="btn btn-danger"
								onClick = {(e) => this.handleRemoveFromCart(e,item.product)}

								>X</button>

							</li>)}
					</ul>
				</div>
			}
			</div>
			</div>

			)}
		else {
			return(
			<div className = 'alert alert-info'>
			<span> Shopping Cart </span>
			<button className = "btn btn-default"  onClick = {()=>setCartDisplay(true)}>Open</button>
			</div>
			)}

}

export default Basket;