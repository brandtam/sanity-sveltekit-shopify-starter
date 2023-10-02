<script lang="ts">
	import { urlFor } from '$lib/utils/sanity';

	export let hero: any;
</script>

<div class="bg-white">
	<div class="relative bg-gray-900">
		<div aria-hidden="true" class="absolute inset-0 overflow-hidden">
			{#if hero.content[0]?.image}
				<img
					src={urlFor(hero.content[0].image).width(2400).auto('format').url()}
					alt={hero.title}
				/>
			{/if}
		</div>
		<div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50" />
		<div
			class="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0"
		>
			{#if hero.title}
				<h1 class="text-4xl font-bold tracking-tight text-white lg:text-6xl">
					{hero.title}
				</h1>
			{/if}

			{#if hero.subtitle}
				<p class="mt-4 text-xl text-white">{hero.subtitle}</p>
			{/if}
			<a
				href={hero.buttonLink ? hero.buttonLink : '/products/all'}
				class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
			>
				{hero.buttonText ? hero.buttonText : 'See The Options'}
			</a>
		</div>
	</div>
</div>
