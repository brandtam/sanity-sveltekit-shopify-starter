<script lang="ts">
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';
	export let galleryID: string;
	export let images: any[] = [];

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

<div class="pswp-gallery" id={galleryID}>
	<div class="my-6 grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each mappedImages as image, index}
			<!-- {#if index % 4 === 0} -->
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
			<!-- {/if} -->
		{/each}
	</div>
</div>
