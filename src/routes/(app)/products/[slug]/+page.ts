import type { PageLoad } from './$types';
import { client } from '$lib/utils/sanity';
import { gql } from '$lib/utils/utils';

export const load = (async ({ fetch, params }) => {
	try {
		const product = await client.fetch(
			gql`*[_type == "product" && store.slug.current == '${params.slug}']{
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
