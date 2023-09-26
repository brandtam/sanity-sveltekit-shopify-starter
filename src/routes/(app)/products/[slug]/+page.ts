import type { PageLoad } from './$types';
import { client } from '$lib/utils/sanity';

export const load = (async ({ fetch, params }) => {
	try {
		const product = await client.fetch(
			`*[_type == "product" && store.slug.current == '${params.slug}']{
				...,
				imageGallery {
					images[]{
						alt,
						asset->{...}
					},
				},
				store {
					...,
					variants[]->
				}
			}`
		);
		return { product: product[0] };
	} catch (error) {
		console.error(error);
	}
}) satisfies PageLoad;
