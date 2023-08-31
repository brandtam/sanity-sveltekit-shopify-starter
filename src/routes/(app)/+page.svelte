<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	export let data;
	const hero = data.home[0].hero;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Hero {hero} />
