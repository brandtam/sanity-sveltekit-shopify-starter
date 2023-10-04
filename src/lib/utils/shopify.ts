const storeUrl = import.meta.env.VITE_SHOPIFY_DOMAIN;
const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION;
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
const shopifyEndpoint = `https://${storeUrl}/api/${apiVersion}/graphql.json`;
const shopifyInactive = !accessToken;

import { gql } from '$lib/utils/utils';
import { shopCart } from '$lib/stores';
import { goto } from '$app/navigation';

async function shopifyFetch({ query, variables }: ShopifyFetch) {
	try {
		const result = await fetch(shopifyEndpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': accessToken
			},
			body: JSON.stringify({ query, variables })
		});

		return {
			status: result.status,
			body: await result.json()
		};
	} catch (error) {
		console.log('shopifyFetch error', error);
		return {
			status: 500,
			error: 'Error receiving data'
		};
	}
}

export async function shopifyCreateCart() {
	if (shopifyInactive) {
		return;
	}
	const query = gql`
		mutation calculateCart($lineItems: [CartLineInput!]) {
			cartCreate(input: { lines: $lineItems }) {
				cart {
					checkoutUrl
					id
					cost {
						totalAmount {
							amount
						}
					}
					totalQuantity
					lines(first: 100) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										priceV2 {
											amount
										}
										product {
											id
											title
											handle
											totalInventory
											images(first: 1) {
												edges {
													node {
														originalSrc
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`;
	const variables = {};
	try {
		const response = await shopifyFetch({
			query,
			variables
		});
		const cart = response.body.data.cartCreate.cart;
		shopCart.set(cart);
		return cart;
	} catch (error) {
		console.log('shopifyCreateCart error', error);
	}
}

export async function shopifyAddToCart({ cartId, variantId, quantity = 1 }: ShopifyCartAdd) {
	const query = gql`
		mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
			cartLinesAdd(cartId: $cartId, lines: $lines) {
				cart {
					checkoutUrl
					id
					cost {
						totalAmount {
							amount
						}
					}
					totalQuantity
					lines(first: 100) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										priceV2 {
											amount
										}
										product {
											id
											title
											handle
											totalInventory
											images(first: 1) {
												edges {
													node {
														originalSrc
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`;
	const variables = {
		cartId: cartId,
		lines: [
			{
				merchandiseId: variantId,
				quantity: quantity
			}
		]
	};
	try {
		const response = await shopifyFetch({
			query,
			variables
		});
		shopCart.set(response.body.data.cartLinesAdd.cart);
		setTimeout(() => goto('/cart'), 0);
	} catch (error) {
		console.log('shopifyAddToCart error', error);
	}
}

export async function shopifyUpdateCart({
	cartId,
	lineId,
	variantId,
	quantity
}: ShopifyCartLineInput) {
	const query = gql`
		mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
			cartLinesUpdate(cartId: $cartId, lines: $lines) {
				cart {
					checkoutUrl
					id
					cost {
						totalAmount {
							amount
						}
					}
					totalQuantity
					lines(first: 100) {
						edges {
							node {
								id
								quantity
								merchandise {
									... on ProductVariant {
										id
										title
										priceV2 {
											amount
										}
										product {
											id
											title
											handle
											totalInventory
											images(first: 1) {
												edges {
													node {
														originalSrc
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				userErrors {
					field
					message
				}
			}
		}
	`;
	const variables = {
		cartId: cartId,
		lines: [
			{
				id: lineId,
				merchandiseId: variantId,
				quantity: quantity
			}
		]
	};
	try {
		const response = await shopifyFetch({
			query,
			variables
		});
		shopCart.set(response.body.data.cartLinesUpdate.cart);
	} catch (error) {
		console.log('shopifyUpdateCart error', error);
	}
}

export async function shopifyRemoveCartLines({ cartId, lineIds }: ShopifyCartLines) {
	const query = gql`
		mutation cartLinesRemove($cartId: ID!, $lines: [ID!]!) {
			cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
				userErrors {
					field
					message
				}
			}
		}
	`;
	const variables = {
		cartId: cartId,
		lineIds: [lineIds]
	};
	try {
		const response = await shopifyFetch({
			query,
			variables
		});
		shopCart.set(response.body.data.cartLinesUpdate.cart);
	} catch (error) {
		console.log('shopifyRemoveCartLines error', error);
	}
}
