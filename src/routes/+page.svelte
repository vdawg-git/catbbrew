<script>
	import { activeColor$ } from "$lib/state/state"
	import ColorAdjustBar from "./design/ColorAdjustBar.svelte"
	import ColorOverview from "./design/ColorOverview.svelte"
	import Foam from "$lib/images/foam.svelte"
	import Coffeescript from "$lib/icons/coffeescript.svelte"
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Catbrew, brew your own flavor. A color scheme generator based on Catppuccin."
	/>
</svelte:head>

<Foam />

<section class="flex flex-col relative overflow-hidden items-center justify-center">
	<div class="flex flex-col gap-3 items-center text-lg">
		<h1
			class="text-2xl md:text-5xl lg:text-6xl font-bold max-w-2xl text-center"
			data-content="Create your own color theme"
		>
			Create your own color theme
		</h1>
		<p class="font-medium tracking-wider">Based on the awesome Catppuccin theme</p>
	</div>

	<a
		href="/design"
		class=" bg-gradient-to-bl text-crust flex gap-3 items-center px4 py2 m6 rounded-2xl bg-gradient-from-peach bg-gradient-to-red ring-offset-background focus-visible:ring-ring font-bold border-crust border border-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:outline outline-offset-2 outline-yellow uppercase"
	>
		Brew your own flavor
		<Coffeescript class="size-8 stroke" />
	</a>
</section>

<ColorOverview />

{#if $activeColor$}
	<div class="fixed flex flex-col items-center bottom-4 z-6 left-1/2 -translate-x-1/2">
		<ColorAdjustBar />
	</div>
{/if}

<style>
	h1 {
		-webkit-text-stroke: 8px theme("colors.crust");
		-webkit-text-fill-color: theme("colors.rosewater");
		paint-order: stroke fill;
		text-shadow: 0.5rem 0.5rem 0 theme("colors.crust");
	}
	p {
		-webkit-text-stroke: 8px theme("colors.base");
		-webkit-text-fill-color: theme("colors.peach");
		paint-order: stroke fill;
		background: theme("colors.peach");
		--at-apply: px4 py1 rounded-lg;
	}

	:global(.stroke) {
		filter: drop-shadow(0 0 1px theme("colors.crust"));
	}
</style>
