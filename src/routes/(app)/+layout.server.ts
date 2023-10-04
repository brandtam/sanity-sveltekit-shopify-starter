import type { LayoutServerLoad } from './$types';
import { client } from '$lib/utils/sanity';
import { gql } from '$lib/utils/utils';

const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN;
const shopifyInactive = !accessToken;

export const load = (async () => {
	const home = async () => {
		try {
			const data = await client.fetch(
				gql`*[_type == "home"]{
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
				gql`*[_type == "product" && store.status == 'active']{
					...,
					store {
						...,
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
