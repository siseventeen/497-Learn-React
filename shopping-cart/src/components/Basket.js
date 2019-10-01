import React, { useEffect, useState } from 'react';


const Basket = ({cartItems}) => {	

	return(
		<div className = 'alent alent-info'>
			{cartItems.length === 0? " Your shopping cart is empty" : <div> You have {cartItems.length} products in your shopping cart. </div>}
		</div>)
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

