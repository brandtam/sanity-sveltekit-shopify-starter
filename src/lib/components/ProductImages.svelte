<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	import { urlFor } from '$lib/utils/sanity';

	export let galleryID: string;
	export let images: any[] = [];

	let selected: number = 0;

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});

	const mappedImages = images.map((image) => {
		return {
			largeURL: image.asset.url,
			thumbnailURL: image.asset.url,
			width: image.asset.metadata.dimensions.width,
			height: image.asset.metadata.dimensions.height,
			alt: image.alt
		};
	});
</script>

<!-- Main image Pane -->
<div class="pswp-gallery" id={galleryID}>
	<div class="aspect-h-1 aspect-w-1 w-full">
		{#if mappedImages.length >= 1}
			{#each mappedImages as image, index}
				<div
					id="tabs-1-panel-{index}"
					aria-labelledby="tabs-1-tab-{index}"
					role="tabpanel"
					tabindex={index}
					class={selected === index ? 'block' : 'hidden'}
				>
					<a
						href={image.largeURL}
						data-pswp-width={image.width}
						data-pswp-height={image.height}
						target="_blank"
						rel="noreferrer"
					>
						<img
							src={urlFor(image.largeURL).width(600).auto('format').url()}
							alt="Alt Text"
							class="h-full w-full object-cover object-center sm:rounded-lg"
						/>
					</a>
				</div>
			{/each}
		{:else}
			<div class="flex items-center justify-center bg-slate-100">
				<p>No Image</p>
			</div>
		{/if}
	</div>
</div>

<!-- <div class="pswp-gallery" id={galleryID}>
	<div class="my-6 grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each mappedImages as image, index}
			<div class="grid gap-4">
				<div>
					<a
						href={image.largeURL}
						data-pswp-width={image.width}
						data-pswp-height={image.height}
						target="_blank"
						rel="noreferrer"
					>
						<img
							class="max-h-full max-w-full rounded-lg"
							src={image.thumbnailURL}
							alt={image.alt}
						/>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div> -->
