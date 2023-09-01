import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { shopifyCreateCart } from '$lib/utils/shopify';
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
const shopifyInactive = !accessToken;

export const shopifyInactiveStore = writable<boolean>(shopifyInactive);

const localStorageCart = browser
	? JSON.parse(window.localStorage.getItem('shop-cart')) ?? [shopifyCreateCart()]
	: [shopifyCreateCart()];

export const shopCart = writable<ShopifyCart>(localStorageCart);

shopCart.subscribe((value) => {
	if (browser) {
		localStorage.setItem('shop-cart', JSON.stringify(value));
	}
});

export const openSide = writable<boolean>(false);
