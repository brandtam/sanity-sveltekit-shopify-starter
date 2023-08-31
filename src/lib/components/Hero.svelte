<script lang="ts">
	import { urlFor } from '$lib/utils/sanity';

	export let hero: any

</script>

<div class="bg-white">
	<div class="relative bg-gray-900">
		<!-- Decorative image and overlay -->
		<div aria-hidden="true" class="absolute inset-0 overflow-hidden">
			<img src={urlFor(hero.content[0].image).width(1200).auto('format').url()} alt="">
		</div>
		<div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />

		<div
			class="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"
		>
			<h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
				{hero.title}
			</h1>
			<p class="mt-4 text-xl text-white">The new arrivals have, well, newly arrived.</p>
			<a
				href="/products/all"
				class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
				>See Them All</a
			>
		</div>
	</div>
</div>
