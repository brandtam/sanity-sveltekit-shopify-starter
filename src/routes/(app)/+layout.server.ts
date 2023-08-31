import type { LayoutServerLoad } from './$types';
import { client } from '$lib/utils/sanity';

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
