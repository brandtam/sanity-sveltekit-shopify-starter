<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });

	import Header from '$lib/components/Header.svelte';
	import '../../app.css';

	export let data;
</script>

<Header products={data.products} />

<slot />
