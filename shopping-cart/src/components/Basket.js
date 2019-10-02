import React, { useEffect, useState } from 'react';
import {setCartDisplay} from '../App.js'

const Basket = ({cartItems}) => {	
const [cartDisplay,setCartDisplay] = useState('False'); 

		if (cartDisplay == "True") {
			return(
			<div>	
			<div className = 'alert alert-info'>
			<span> Shopping Cart </span>
			<button className = "btn btn-default" onClick = {()=>setCartDisplay('False')}>Close</button>
			</div>

			<div className = 'alert alert-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <div> You have {cartItems.length} products in your shopping cart. </div>}
			</div>
			</div>

			)}
		else {
			return(
			<div className = 'alert alert-info'>
			<span> Shopping Cart </span>
			<button className = "btn btn-default"  onClick = {()=>setCartDisplay('True')}>Open</button>
			</div>
			)}

		


}

export default Basket;


{/* export default class Basket exends Component {
	render(){
		const {cartItems} = this.props;
	return(
		<div className = 'alent alent-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <div> You have {cartItems.length} products in your shopping cart. </div>}
			{cartItems.length > 0 &&
				<div>
					<ul>
						{cartItems.map( items =>
							<li>
								<b>{item.title}</b>
								<button className="btn btn-danger"
								onClick = {(e) => this.handleRemoveFromCart(e,item)}

								>X</button>

							</li>)}
					</ul>
				</div>
			}

		</div>)	
	}
}

*/}

