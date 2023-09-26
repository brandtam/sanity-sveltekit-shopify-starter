<script lang="ts">
	export let data;
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<h2 class="sr-only">Products</h2>

		<div
			class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
		>
			{#each data.products as product}
				{#if product.store.status === 'active'}
					<div
						class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
					>
						<div
							class="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96"
						>
							<img
								src={product.store.previewImageUrl}
								alt={product.store.title}
								class="h-full w-full object-cover object-center sm:h-full sm:w-full"
							/>
						</div>
						<div class="flex flex-1 flex-col space-y-2 p-4">
							<h3 class="text-sm font-medium text-gray-900">
								<a href="/products/{product.store.slug.current}">
									<span aria-hidden="true" class="absolute inset-0" />
									{product.store.title}
								</a>
							</h3>
							<p class="text-sm text-gray-500">
								{@html product.store.descriptionHtml}
							</p>
							<div class="flex flex-1 flex-col justify-end">
								<p class="text-sm italic text-gray-500">{product.store.vendor}</p>
								<p class="text-base font-medium text-gray-900">
									${product.store.priceRange.maxVariantPrice}
								</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
