<script>
	import { activeColor$ } from "$lib/state/colors"
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

<header class="flex z-20 items-center justify-center w-full">
	<div class="max-w-screen-sm flex items-center justify-between w-full px-4">
		<div class="text-center text-lg"></div>

		<ul class="flex gap-2 text-neutral-5">
			<li></li>
		</ul>
	</div>
</header>

<section class="flex z-10 self-center my-auto flex-col relative items-center justify-center">
	<p
		class="text-stroke-8 text-pink text-lg md:text-3xl text-stroke-crust font-bold self-start ml-6 -rotate-15"
	>
		Catbbrew
	</p>
	<div class="flex flex-col gap-3 items-center text-lg">
		<h1 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-[15ch] text-center">
			Create your own color theme
		</h1>
		<p class="font-medium p bg-peach tracking-wider">Based on the awesome Catppuccin system</p>
	</div>

	<div class="flex gap-1 items-center">
		<a
			href="/design"
			class=" bg-gradient-to-bl text-crust flex gap-3 items-center px4 py2 m6 rounded-2xl bg-gradient-from-peach bg-gradient-to-red ring-offset-background focus-visible:ring-ring font-bold border-crust border border-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:outline outline-offset-2 outline-yellow uppercase"
		>
			Brew your own flavor
			<Coffeescript class="size-7 stroke" />
		</a>

		<a
			href="https://github.com/vdawg-git/catbbrew"
			class=""
			aria-label="Toggle dark and light mode"
		>
			<div class="p-2">
				<div class="i-mingcute-github-2-line size-8"></div>
			</div></a
		>
	</div>
</section>

{#if $activeColor$}
	<div class="fixed flex flex-col items-center bottom-4 z-6 left-1/2 -translate-x-1/2">
		<ColorAdjustBar />
	</div>
{/if}

<div
	class="fixed transform-origin-t right-6 top-1/2 -translate-y-1/2 bg-surface0 items-center flex-col gap3 outline shadow-base shadow outline-border rounded-3xl flex overflow-auto justify-stretch items-stretch flex flex-col rounded-3xl !p-0 m-0 z-10"
>
	<ColorOverview class="flex-col" />
</div>

<Foam />

<style>
	h1 {
		-webkit-text-stroke: 8px theme("colors.crust");
		-webkit-text-fill-color: theme("colors.maroon");
		paint-order: stroke fill;
		text-shadow: 0.5rem 0.5rem 0 theme("colors.crust");
	}
	.p {
		-webkit-text-stroke: 8px theme("colors.base");
		-webkit-text-fill-color: theme("colors.peach");
		paint-order: stroke fill;
		--at-apply: px4 py1 rounded-lg;
	}

	:global(.stroke) {
		filter: drop-shadow(0 0 1px theme("colors.crust"));
	}

	* {
		paint-order: stroke fill;
	}
</style>
