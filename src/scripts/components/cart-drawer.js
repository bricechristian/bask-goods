import { serializeForm } from "../utilities/serializeForm";
if (document.querySelector(".cart__drawer") !== null) {
	const $cartDrawerWrap = document.querySelector(".cart__drawer-wrap");
	const $cartDrawerOverlay = document.querySelector(".cart__drawer-overlay");
	const $cartDrawer = document.querySelector(".cart__drawer");
	const $cartItems = document.querySelector(".cart__drawer-items");
	const $bag = document.querySelector(".bag-count");
	//UPDATE CART
	const updateCart = () => {
		fetch(`/cart.js`, {
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			}
		}).then(response => {
			return response.json();
		}).then(cart => {
			console.log(cart)
			$cartItems.innerHTML = "";
			if (cart.item_count > 0) {
				const { items } = cart;
				items.forEach(item => {
					buildItem(item, $cartItems)
				});
				$bag.textContent = cart.item_count;
			} else {
				$bag.textContent = "0";
			}
		})
	}
	//CART ITEM BUILDER
	const buildItem = (cartItem, selector) => {
		let itemHTML = document.createRange().createContextualFragment(`
			<div class="cart__drawer-item">
				<div>${cartItem.product_title}</div>
				<div>${cartItem.variant_title}</div>
				<a href="#" onclick="window.removeFromCart(${cartItem.variant_id}); return false;" style="cursor:pointer;">REMOVE</a>
			<\/div>
		`);
		selector.prepend(itemHTML);
	}
	//OPEN CART
	const showCart = () => {
		setTimeout(() => {
			if (document.querySelector(".header__overlay").classList.contains("active")) {
				document.querySelector(".header__overlay").classList.remove("active")
			}
			if (document.querySelector(".header").classList.contains("dropdown-open")) {
				document.querySelector(".header").classList.remove("dropdown-open")
			}
		}, 51);
		$cartDrawerWrap.classList.add("active")
	}
	//CLOSE CART
	const closeCart = () => {
		if ($cartDrawerWrap.classList.contains("active")) {
			$cartDrawerWrap.classList.remove("active")
		}
	}
	//CART ITEM ADD
	const addToCart = (form_id) => {
		fetch(`/cart/add.js`, {
			body: JSON.stringify(serializeForm(document.getElementById(form_id))),
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			updateCart()
			showCart()
		})
	}
	//CART ITEM REMOTE
	const removeFromCart = (id) => {
		const removeItemData = `updates[${id}]=0`;
		fetch(`/cart/update.js?${removeItemData}`, {
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			updateCart()
			showCart()
		})
	}
	window.updateCart = updateCart;
	window.addToCart = addToCart;
	window.removeFromCart = removeFromCart;
	window.showCart = showCart;
	window.closeCart = closeCart;
}

updateCart()