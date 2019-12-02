import React from 'react';


const Basket = ({cartDisplay, products, handleCartDisplayFunc, cartItems, handleRemoveFromCartFunc, handleCheckoutFunc}) => {
	const formatCartItems = ({cartItems}, {products}) => {
		let formatted = [];
		for(const sku in cartItems) {
			for(const sz in cartItems[sku]) {
				if(cartItems[sku][sz] > 0) {
					formatted.push( {"product": products[sku], "size":sz, "count": cartItems[sku][sz]});
				}
			}
		}
		return formatted;
	}
	
	const countMoney = ({cartItems}, {products})=>{
		let totalMoney = 0;
		for(const sku in cartItems) {
			for(const sz in cartItems[sku]) {
				if(cartItems[sku][sz] > 0) {
					totalMoney += products[sku].price * cartItems[sku][sz];
				}
			}
		}
		return totalMoney;
	}

	const countItem = ({cartItems}) => {
		let totalItem = 0;
		for(const sku in cartItems) {
			for(const sz in cartItems[sku]) {
				if(cartItems[sku][sz] > 0) {
					totalItem += cartItems[sku][sz];
				}
			}
		}
		return totalItem;
	}

	if (cartDisplay) {
		return(
		<div>	
		<div className = 'alert alert-info'>
		{formatCartItems({cartItems}, {products}).length === 0? " Your shopping cart is empty" : <span> You have {countItem({cartItems})} items. </span>}
		<button className = "btn btn-default" onClick = {()=>handleCartDisplayFunc(false)}>Close</button>
		</div>

		<div className = 'alert alert-info'>
		
		{formatCartItems({cartItems}, {products}).length > 0 &&
			<div>
				<ul>
					{formatCartItems({cartItems}, {products}).map( item =>
						<li key={`${item.product.sku}_${item.size}`}>
							<b>{item.product.title} {item.size} </b>
								X <b> {item.count}</b>
							<button className="btn btn-danger"
							onClick = {(e) => handleRemoveFromCartFunc(e,item.product.sku,item.size)}
							>X</button>

						</li>)}
				</ul>
				<div>Totoal: $ {countMoney({cartItems}, {products}).toFixed(2)}</div>
			</div>
		}

		{formatCartItems({cartItems}, {products}).length > 0 &&
			<button className="btn btn-primary"
				onClick = {(e) => handleCheckoutFunc()}
			>Check Out</button>
		}

		</div>
		</div>

		)}
	else {
		return(
		<div className = 'alert alert-info'>
		{formatCartItems({cartItems}, {products}).length === 0? " Your shopping cart is empty" :  <span> You have {countItem({cartItems})} items. </span>}
		<button className = "btn btn-default"  onClick = {()=>handleCartDisplayFunc(true)}>Open</button>
		</div>
	)}

}

export default Basket;