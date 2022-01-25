import { serializeForm } from "../utilities/serializeForm";
if (document.querySelector(".cart__drawer") !== null) {
	const $cartDrawerWrap = document.querySelector(".cart__drawer-wrap");
	const $cartDrawerOverlay = document.querySelector(".cart__drawer-overlay");
	const $cartDrawer = document.querySelector(".cart__drawer");
	const $cartItems = document.querySelector(".cart__drawer-items");
	const $bag = document.querySelector(".bag-count");
	//UPDATE CART
	const refreshCart = () => {
		fetch(`/cart.js`, {
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
				$cartItems.innerHTML = "<div class='font-italic text-24'>Your cart is empty</div>";
			}
		})
	}
	//CART ITEM BUILDER
	const buildItem = (cartItem, selector) => {
		let itemHTML = document.createRange().createContextualFragment(`
			<div class="cart__drawer-item">
				<div class="cart__drawer-item-image">
					<img src="${cartItem.featured_image.url}" alt="${cartItem.featured_image.alt}" />
				</div>
				<div class="cart__drawer-item-content">
					<div class="flex-grow">
						<div class="font-heading text-24 md:text-20">${cartItem.product_title}</div>
						<div class="font-matterlight text-24 md:text-20">${cartItem.variant_title}</div>
						<div class="font-matterlight text-18 tracking-widest text-brown md:text-16">${Shopify.formatMoney(cartItem.price).replace('.00', '')}</div>
					</div>
					<div class="flex items-center">
						<a href="#" class="font-matterlight text-13 tracking-[.081em] opacity-30" onclick="window.removeFromCart(${cartItem.variant_id}); return false;" style="cursor:pointer;">REMOVE</a>
					</div>
				</div>
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
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			refreshCart()
			showCart()
		})
	}
	//CART ITEM REMOTE
	const removeFromCart = (id) => {
		const removeItemData = `updates[${id}]=0`;
		fetch(`/cart/update.js?${removeItemData}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'xmlhttprequest'
			},
			method: 'POST'
		}).then(response => {
			return response.json();
		}).then(() => {
			refreshCart()
			showCart()
		})
	}
	window.refreshCart = refreshCart;
	window.addToCart = addToCart;
	window.removeFromCart = removeFromCart;
	window.showCart = showCart;
	window.closeCart = closeCart;
}

refreshCart()