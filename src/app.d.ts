// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type Cost = {
		totalAmount: {
			amount: number;
		};
	};

	type Image = {
		originalSrc: string;
	};

	type ShopifyProduct = {
		id: string;
		title: string;
		handle: string;
		totalInventory: number;
		images: Array<Image>;
	};

	type ShopifyProductVariant = {
		id: string;
		title: string;
		priceV2: number;
		product: Product;
	};

	type LineNode = {
		id: string;
		quantity: number;
		merchandise: ProductVariant;
	};

	type LineEdge = {
		node: LineNode;
	};

	type LineConnection = {
		edges: Array<LineEdge>;
	};

	type ShopifyCart = {
		checkoutUrl: string;
		id: string;
		cost: Cost;
		totalQuantity: number;
		lines: LineConnection;
	};

	type CartCreatePayload = {
		cart: Cart;
	};

	type ShopifyCartLineInput = {
		cartId: string;
		lineId: string;
		variantId: number;
		quantity: number;
	};

	type ShopifyCartLines = {
		cartId: string;
		lineIds: Array<string>;
	};

	type ShopifyCartAdd = {
		cartId: string;
		variantId: number;
		quantity: number;
	};

	type CalculateCartMutation = {
		calculateCart: CartCreatePayload;
	};

	type ShopifyFetch = {
		query: string;
		variables?: Record<string, unknown>;
	};

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
