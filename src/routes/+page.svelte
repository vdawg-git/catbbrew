<script>
	import Button from "$lib/components/ui/button/button.svelte"
	import { activeColor$ } from "$lib/state/state"
	import ColorAdjustBar from "./design/ColorAdjustBar.svelte"
	import ColorOverview from "./design/ColorOverview.svelte"
	import foam from "$lib/images/foam.svg?raw"
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Catbrew, brew your own flavor. A color scheme generator based on Catppuccin."
	/>
</svelte:head>

<section class="flex flex-col relative overflow-hidden items-center justify-center">
	<div class="flex flex-col gap-3 items-center text-lg">
		<h1
			class="text-2xl lg:text-4xl font-medium bg-gradient-from-rosewater bg-gradient-to-pink bg-gradient-to-bl bg-clip-text text-transparent"
		>
			Create your own color theme
		</h1>
		<p>Based on the awesome Catppuccin theme</p>
	</div>

	<a
		href="/design"
		class=" bg-gradient-to-bl text-crust px4 py2 m6 rounded-2xl bg-gradient-from-peach bg-gradient-to-red ring-offset-background focus-visible:ring-ring font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:outline outline-offset-2 outline-yellow"
	>
		Create your own flavor
	</a>

	<ColorOverview />
</section>

<div class="">
	{@html foam}
</div>

{#if $activeColor$}
	<div class="fixed flex flex-col items-center bottom-4 z-6 left-1/2 -translate-x-1/2">
		<ColorAdjustBar />
	</div>
{/if}

<style>
	:global(.foam-bg) {
		--at-apply: fixed inset-0;
		width: max(100vw, 100vh);
		height: max(100vw, 100vh);
		z-index: -1;
	}
</style>
