// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			// use relative URLs similar to an anchor tag <a href="/products/1"></a>
			// do not include group layout folders in the path such as /(app)/products/1
			// entries: [
			// 	'/products/handle1',
			// 	'/products/handle2'
			// ]
		}
	},
	preprocess: vitePreprocess()
};

export default config;
