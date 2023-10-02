<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	export let data;
	let hero: {
		title: string;
		subtitle: string;
		image: string;
		buttonText: string;
		buttonLink: string;
	};

	if (data?.home[0]) {
		hero = data.home[0].hero;
	} else {
		data.home[0] = {
			hero: {
				title: 'There is no content setup in Sanity yet.',
				subtitle: 'Please add some content to the home page.',
				content: '',
				buttonText: 'Add Content',
				buttonLink: '/studio/desk/home'
			}
		};
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if hero?.title}
	<Hero {hero} />
{:else}
	<h1>There is no content setup in Sanity yet.</h1>
	<p>
		Click <a class="text-blue-600 hover:underline dark:text-blue-500" href="/studio/desk/home">
			here</a
		> to open Sanity Studio.
	</p>
{/if}
