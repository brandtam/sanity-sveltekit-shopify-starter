import type { LayoutServerLoad } from './$types';
import { client } from '$lib/utils/sanity';

const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
const shopifyInactive = !accessToken;

export const load = (async () => {
	const home = async () => {
		try {
			const data = await client.fetch(
				`*[_type == "home"]{
					...,
				}`
			);
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const sanityProducts = async () => {
		if (shopifyInactive) {
			return [];
		}
		try {
			const data = await client.fetch(
				`*[_type == "product" && store.status == 'active']{
					...,
					store {
						...,
						title,
						variants[]->
					}
				}`
			);
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	return {
		products: sanityProducts(),
		home: home()
	};
}) satisfies LayoutServerLoad;
