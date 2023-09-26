<script lang="ts">
	import { shopCart, shopifyInactiveStore } from '$lib/stores';
	import type { PageData } from '../../routes/(app)/$types';
	import { linear } from 'svelte/easing';
	import { fly, fade } from 'svelte/transition';

	let showSidePanel: boolean, showFlyout: boolean, width: number, selected: string;
	selected = 'Products';

	function toggleSide() {
		showSidePanel = !showSidePanel;
	}
	function toggleFlyout() {
		showFlyout = !showFlyout;
	}

	function linkClickHandler() {
		showSidePanel = false;
		showFlyout = false;
	}

	export let products: PageData['products'];
</script>

<div class="bg-white">
	{#if showSidePanel}
		<div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
			<div
				transition:fade={{ duration: 200, easing: linear, delay: 300 }}
				class="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
			/>

			<div class="fixed inset-0 z-40 flex">
				<div
					bind:clientWidth={width}
					transition:fly={{ x: -width, duration: 300, easing: linear }}
					class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
				>
					<div class="flex px-4 pb-2 pt-5">
						<button
							on:click={toggleSide}
							type="button"
							class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
						>
							<span class="sr-only">Close menu</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Links -->
					{#if !$shopifyInactiveStore}
					<div class="mt-2">
						<div class="border-b border-gray-200">
							<div class="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
								<button
									on:click={() => (selected = 'Products')}
									id="tabs-1-tab-1"
									class="{selected === 'Products'
										? 'border-indigo-600 text-indigo-600'
										: 'border-transparent text-gray-900'} flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
									aria-controls="tabs-1-panel-1"
									role="tab"
									type="button">Products</button
								>
								<button
									on:click={() => (selected = 'Other')}
									id="tabs-1-tab-2"
									class="{selected === 'Other'
										? 'border-indigo-600 text-indigo-600'
										: 'border-transparent text-gray-900'} flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
									aria-controls="tabs-1-panel-1"
									role="tab"
									type="button">Other</button
								>
							</div>
						</div>

						<div
							id="tabs-1-panel-1"
							class="{selected === 'Products' ? 'block' : 'hidden'} space-y-10 px-4 pb-8 pt-10"
							aria-labelledby="tabs-1-tab-1"
							role="tabpanel"
							tabindex="0"
						>
							<div class="space-y-4">
								{#each products as product}
									<div
										class="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100"
									>
										<img
											src={product.store.previewImageUrl}
											alt={product.store.title}
											class="object-cover object-center md:group-hover:opacity-75"
										/>
										<div class="flex flex-col justify-end">
											<div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
												<a
													on:click={linkClickHandler}
													href="/products/{product.store.slug.current}"
													class="font-medium text-gray-900"
												>
													<span class="absolute inset-0" aria-hidden="true" />
													{product.store.title}
												</a>
												<p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
					{/if}
					<div class="space-y-6 border-t border-gray-200 px-4 py-6">
						<div class="flow-root">
							<a
								on:click={linkClickHandler}
								href="/company"
								class="-m-2 block p-2 font-medium text-gray-900">Company</a
							>
						</div>
						<div class="flow-root">
							<a
								on:click={linkClickHandler}
								href="/about"
								class="-m-2 block p-2 font-medium text-gray-900">About</a
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<header class="relative border-b border-gray-200 bg-white">
		<nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="">
				<div class="flex h-16 items-center justify-between">
					<div class="flex flex-1 items-center lg:hidden">
						<button
							on:click={toggleSide}
							type="button"
							class="-ml-2 rounded-md bg-white p-2 text-gray-400"
						>
							<span class="sr-only">Open menu</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>

					<!-- Flyout menus -->

					<div class="z-10 hidden lg:block lg:flex-1 lg:self-stretch">
						<div class="flex h-full space-x-8">
							{#if !$shopifyInactiveStore}
							<div class="flex">
								<div class="relative flex">
									<button
										on:click={toggleFlyout}
										type="button"
										class="{showFlyout
											? 'text-indigo-600'
											: 'text-gray-700 md:hover:text-gray-800'} relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out"
										aria-expanded="false"
									>
										Products
										<span
											class="{showFlyout
												? 'bg-indigo-600'
												: ''} absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-200 ease-out sm:mt-5 sm:translate-y-px sm:transform"
											aria-hidden="true"
										/>
									</button>
								</div>
								{#if showFlyout}
									<div
										bind:clientWidth={width}
										transition:fly={{ y: `-300px`, duration: 400, easing: linear }}
										class="absolute inset-x-0 top-full transition-opacity duration-200 ease-out"
									>
										<div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

										<div class="relative bg-white">
											<div class="mx-auto max-w-7xl px-8">
												<div class="grid gap-x-8 gap-y-10 py-16">
													<div class="grid grid-cols-4 grid-rows-1 gap-8 text-sm">
														{#each products as product}
															{#if product.store.status === 'active'}
																<div
																	class="group aspect-h-1 aspect-w-1 relative overflow-hidden rounded-md bg-gray-100"
																>
																	<img
																		src={product.store.previewImageUrl}
																		alt={product.store.title}
																		class="object-cover object-center md:group-hover:opacity-75"
																	/>
																	<div class="flex flex-col justify-end">
																		<div class="bg-white bg-opacity-60 p-4 text-sm">
																			<a
																				on:click={linkClickHandler}
																				href="/products/{product.store.slug.current}"
																				class="font-medium text-gray-900"
																			>
																				<span class="absolute inset-0" aria-hidden="true" />
																				{product.store.title}
																			</a>
																			<p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">
																				Shop now
																			</p>
																		</div>
																	</div>
																</div>
															{/if}
														{/each}
													</div>
												</div>
											</div>
										</div>
									</div>
								{/if}
							</div>
							{/if}
							<a
								on:click={linkClickHandler}
								href="/company"
								class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
								>Company</a
							>
							<a
								on:click={linkClickHandler}
								href="/stores"
								class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
								>Stores</a
							>
						</div>
					</div>

					<!-- Logo -->
					<a on:click={linkClickHandler} href="/" class="flex">
						<span class="sr-only">Company Logo</span>
						<img
							class="h-14 w-auto"
							src="/sanity.svg"
							width="64"
							height="64"
							alt="Sanity Logo"
						/>
						<img
							class="h-14 w-auto"
							src="/plus.svg"
							width="64"
							height="64"
							alt="Plus Sign"
						/>
						<img
							class="h-14 w-auto"
							src="/svelte.svg"
							width="64"
							height="64"
							alt="Svelte Logo"
						/>
						{#if !$shopifyInactiveStore}
						<img
							class="h-14 w-auto"
							src="/plus.svg"
							width="64"
							height="64"
							alt="Plus Sign"
						/>
						<img
							class="h-14 w-auto"
							src="/shopify_glyph.svg"
							width="64"
							height="64"
							alt="Shopify Logo"
						/>
						{/if}
					</a>

					<div class="flex flex-1 items-center justify-end">
						<!-- Account -->
						<a
							on:click={linkClickHandler}
							href="/account"
							class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4"
						>
							<span class="sr-only">Account</span>
							<svg
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
						</a>

						<!-- Cart -->
						{#if !$shopifyInactiveStore}
						<div class="ml-4 flow-root lg:ml-6">
							<a on:click={linkClickHandler} href="/cart" class="group -m-2 flex items-center p-2">
								<svg
									class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
									/>
								</svg>
								<span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
									>{$shopCart.totalQuantity || 0}</span
								>
								<span class="sr-only">items in cart, view bag</span>
							</a>
						</div>
						{/if}
					</div>
				</div>
			</div>
		</nav>
	</header>
</div>
