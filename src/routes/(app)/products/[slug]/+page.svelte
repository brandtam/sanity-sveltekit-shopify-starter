<script lang="ts">
	import type { PageData } from './$types';
	import { shopifyAddToCart } from '$lib/utils/shopify';
	import { shopCart } from '$lib/stores';
	import { urlFor } from '$lib/utils/sanity';
	import { onMount } from 'svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import 'photoswipe/style.css';

	onMount(() => {
		let lightbox = new PhotoSwipeLightbox({
			gallery: '#' + galleryID,
			children: 'a',
			pswpModule: () => import('photoswipe')
		});
		lightbox.init();
	});

	let selectedVariant: number = 0;
	let selectedImage: number = 0;
	let openAccordion: number = 0;

	function toggleAccordion(index: number) {
		if (openAccordion === index) {
			openAccordion = 0;
		} else {
			openAccordion = index;
		}
	}

	export let data: PageData;
	$: ({ product } = data);

	function addToCartHandler(lineItem: ShopifyCartAdd) {
		shopifyAddToCart({
			cartId: lineItem.cartId,
			variantId: lineItem.variantId,
			quantity: lineItem.quantity
		});
	}

	let galleryID = 'product-images';
</script>

<svelte:head>
	<title>{product.store.title}</title>
</svelte:head>

<main class="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
	<div class="mx-auto max-w-2xl lg:max-w-none">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<div class="flex flex-col-reverse">
				<!-- Images list -->
				<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
						{#if product.imageGallery && product.imageGallery?.images.length >= 1}
							{#each product.imageGallery.images as image, index}
								<button
									on:click={() => (selectedImage = index)}
									id="tabs-1-tab-{index}"
									class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
									aria-controls="tabs-1-panel-{index}"
									role="tab"
									type="button"
								>
									<span class="sr-only">Main Image</span>
									<span class="absolute inset-0 overflow-hidden rounded-md">
										<img
											src={urlFor(image.asset).width(130).url()}
											alt={image.alt}
											class="h-full w-full object-cover object-center"
										/>
									</span>
									<span
										class="{selectedImage === index
											? 'ring-indigo-500'
											: 'ring-transparent'} pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
										aria-hidden="true"
									/>
								</button>
							{/each}
						{:else}
							<div class="flex items-center justify-center bg-slate-100">
								<p>No Images</p>
							</div>
						{/if}
					</div>
				</div>
				<!-- Main image Pane -->
				<div class="pswp-gallery" id={galleryID}>
					<div class="w-full">
						{#if product.imageGallery && product.imageGallery.images.length >= 1}
							{#each product.imageGallery.images as image, index}
								<a
									href={image.asset.url}
									data-pswp-width={image.asset.metadata.dimensions.width}
									data-pswp-height={image.asset.metadata.dimensions.height}
									target="_blank"
									rel="noreferrer"
								>
									<div
										id="tabs-1-panel-{index}"
										aria-labelledby="tabs-1-tab-{index}"
										role="tabpanel"
										tabindex={index}
										class="{selectedImage === index
											? 'block'
											: 'hidden'} aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100"
									>
										<img
											src={urlFor(image.asset.url).width(600).auto('format').url()}
											alt={image.alt}
											class="h-full w-full object-cover object-center sm:rounded-lg"
										/>
										<div class="flex flex-col justify-end md:hidden">
											<div class="z-10 bg-white bg-opacity-60 p-4 text-base sm:text-sm">
												<span class=" inset-0" aria-hidden="true" />
												{index + 1} of {product.imageGallery.images.length}
												<p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">
													Click for more photos
												</p>
											</div>
										</div>
									</div>
								</a>
							{/each}
						{:else}
							<div class="flex items-center justify-center bg-slate-100">
								<p>No Image</p>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">{product.store.title}</h1>

				{#if product.store.variants.length > 1 && product.store.priceRange.minVariantPrice != product.store.priceRange.maxVariantPrice}
					<div class="mt-3">
						<h2 class="sr-only">Product information</h2>
						<p class="text-3xl tracking-tight text-gray-900">
							${product.store.priceRange.minVariantPrice.toFixed(2)} - ${product.store.priceRange.maxVariantPrice.toFixed(
								2
							)}
						</p>
					</div>
				{:else}
					<div class="mt-3">
						<h2 class="sr-only">Product information</h2>
						<p class="text-3xl tracking-tight text-gray-900">
							${product.store.variants[0].store.price.toFixed(2)}
						</p>
					</div>
				{/if}

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6 text-base text-gray-700">
						<p>
							{@html product.store.descriptionHtml}
						</p>
					</div>
				</div>

				<form class="mt-6">
					{#each product.store.variants as variant, i}
						<button
							on:click={() => (selectedVariant = variant.store.gid)}
							type="button"
							class="w-100 group relative m-2 flex items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50
							{selectedVariant === variant.store.gid || (selectedVariant === 0 && i === 0)
								? 'outline-none ring-2 ring-indigo-500 ring-offset-2'
								: ''}"
							aria-controls="policies"
							aria-expanded="false"
							>{variant.store.title}
							<span
								class="{selectedVariant === variant.store.gid || (selectedVariant === 0 && i === 0)
									? 'text-indigo-600'
									: 'text-gray-900'} text-sm font-medium"
							>
								- Select</span
							>
							<span
								class="ml-2 flex-shrink-0 rounded-full border-2 border-transparent group-hover:border-gray-300"
							>
								<span
									class="{selectedVariant === variant.store.gid ||
									(selectedVariant === 0 && i === 0)
										? 'bg-indigo-600'
										: 'bg-white'} h-4 w-4 rounded-full group-hover:bg-gray-300"
									aria-hidden="true"
								/>
							</span>
						</button>
					{/each}
					<div class="mt-10 flex">
						<button
							on:click={() =>
								addToCartHandler({
									cartId: $shopCart.id,
									variantId: selectedVariant || product.store.variants[0].store.gid,
									quantity: 1
								})}
							type="submit"
							class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
							>Add to bag</button
						>
					</div>
				</form>

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Additional details</h2>

					<div class="divide-y divide-gray-200 border-t">
						<div>
							<h3>
								<button
									on:click={() => toggleAccordion(1)}
									type="button"
									class="group relative flex w-full items-center justify-between py-6 text-left"
									aria-controls="disclosure-1"
									aria-expanded="false"
								>
									<span
										class="{openAccordion === 1
											? 'text-indigo-600'
											: 'text-gray-900'} text-sm font-medium">Specs</span
									>
									<span class="ml-6 flex items-center">
										<svg
											class="{openAccordion === 1
												? 'hidden'
												: 'block'} h-6 w-6 text-gray-400 group-hover:text-gray-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M12 4.5v15m7.5-7.5h-15"
											/>
										</svg>
										<svg
											class="{openAccordion === 1
												? 'block'
												: 'hidden'} h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
										</svg>
									</span>
								</button>
							</h3>
							<div
								class="{openAccordion === 1 ? 'block' : 'hidden'} prose prose-sm pb-6"
								id="disclosure-1"
							>
								<ul>
									<li>stat 1: value 1</li>
									<li>stat 2: value 2</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</main>
