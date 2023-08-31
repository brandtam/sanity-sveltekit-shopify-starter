<script lang="ts">
	import { shopCart } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { shopifyUpdateCart } from '$lib/utils/shopify';

	const showQuantity = false;
	$: shippingEstimate = Number($shopCart?.totalQuantity || 0) * 150;

	function checkoutHandler() {
		goto($shopCart.checkoutUrl);
	}
	function removeFromCartHandler({ cartId, lineId, variantId, quantity }: ShopifyCartLineInput) {
		shopifyUpdateCart({ cartId, lineId, variantId, quantity });
	}
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
		{#if !$shopCart.id}
			<p>Loading Cart...</p>
		{:else if $shopCart.lines.edges.length === 0}
			<p>The cart is empty</p>
		{:else}
			<form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
				<section aria-labelledby="cart-heading" class="lg:col-span-7">
					<h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

					<ul class="divide-y divide-gray-200 border-b border-t border-gray-200">
						{#each $shopCart.lines.edges as item}
							<li class="flex py-6 sm:py-10">
								<div class="flex-shrink-0">
									<a href="/products/{item.node.merchandise.product.handle}">
										<img
											src={item.node.merchandise.product.images.edges[0].node.originalSrc}
											alt="Main Product"
											class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
										/>
									</a>
								</div>

								<div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
									<div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
										<div>
											<div class="flex justify-between">
												<h3 class="text-sm">
													<a
														href="/products/{item.node.merchandise.product.handle}"
														class="font-medium text-gray-700 hover:text-gray-800"
														>{item.node.merchandise.product.title}</a
													>
												</h3>
											</div>
											<div class="mt-1 flex text-sm">
												<p class="text-gray-500">{item.node.merchandise.title}</p>
											</div>
											<p class="mt-1 text-sm font-medium text-gray-900">
												${Number(item.node.merchandise.priceV2.amount).toFixed(2)}
											</p>
										</div>

										<div class="mt-4 justify-self-end sm:mt-0 sm:pr-9">
											{#if showQuantity}
												<label for="quantity-0" class="sr-only"
													>Quantity, {item.node.merchandise.product.title}</label
												>
												<select
													bind:value={item.node.quantity}
													id="quantity-0"
													name="quantity-0"
													class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
												>
													{#each Array(item.node.quantity) as _, index (index)}
														<option value={index + 1}>{index + 1}</option>
													{/each}
												</select>
											{/if}
											<div class="absolute right-0 top-0">
												<button
													on:click={() =>
														removeFromCartHandler({
															cartId: $shopCart.id,
															lineId: item.node.id,
															variantId: item.node.merchandise.id,
															quantity: 0
														})}
													type="button"
													class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
												>
													<span class="sr-only">Remove</span>
													<svg
														class="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>

									<p class="mt-4 flex space-x-2 text-sm text-gray-700">
										<svg
											class="h-5 w-5 flex-shrink-0 text-green-500"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
										<span>In stock</span>
									</p>
								</div>
							</li>
						{/each}
					</ul>
				</section>

				<!-- Order summary -->
				<section
					aria-labelledby="summary-heading"
					class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
				>
					<h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

					<dl class="mt-6 space-y-4">
						<div class="flex items-center justify-between">
							<dt class="text-sm text-gray-600">Subtotal</dt>
							<dd class="text-sm font-medium text-gray-900">
								${Number($shopCart.cost.totalAmount.amount).toFixed(2)}
							</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="flex items-center text-sm text-gray-600">
								<span>Shipping estimate</span>
								<a href="/shipping" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
									<span class="sr-only">Learn more about how shipping is calculated</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							</dt>
							<dd class="text-sm font-medium text-gray-900">${shippingEstimate.toFixed(2)}</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="flex text-sm text-gray-600">
								<span>Tax estimate</span>
								<a href="/taxes" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
									<span class="sr-only">Learn more about how tax is calculated</span>
									<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
											clip-rule="evenodd"
										/>
									</svg>
								</a>
							</dt>
							<dd class="text-sm font-medium text-gray-900">calculated at checkout</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-4">
							<dt class="text-base font-medium text-gray-900">Order total</dt>
							<dd class="text-base font-medium text-gray-900">
								${(Number($shopCart.cost.totalAmount.amount) + shippingEstimate).toFixed(2)}
							</dd>
						</div>
					</dl>

					<div class="mt-6">
						<button
							on:click={() => checkoutHandler()}
							type="submit"
							class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
							>Checkout</button
						>
					</div>
				</section>
			</form>
		{/if}
	</div>
</div>
