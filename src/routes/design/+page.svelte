<script>
	import Button from "$lib/components/ui/button/button.svelte"
	import Input from "$lib/components/ui/input/input.svelte"
	import Label from "$lib/components/ui/label/label.svelte"
	import Separator from "$lib/components/ui/separator/separator.svelte"
	import { activeColor, activeColorHsl$ } from "$lib/state/colors"
	import CodeBlock from "./CodeBlock.svelte"
	import ColorAdjustBar from "./ColorAdjustBar.svelte"
	import ColorOverview from "./ColorOverview.svelte"
	import LanguageSelection from "./LanguageSelection.svelte"
	import PresetsPicker from "./PresetsPicker.svelte"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex relative max-h-screen overflow-clip grow min-h-0 min-w-0">
	<aside
		class="py-2 relative px-3 flex flex-col overflow-auto justify-start gap-6 max-w-60 lg:max-w-70 xl:max-w-80 bg-mantle min-h-0"
	>
		<div class="flex justify-between px-2 mt-1">
			<a
				href="/"
				class="text-stroke-text text-crust stroke text-stroke-4 hover:text-stroke-peach font-bold"
				>Catbbrew</a
			>
		</div>

		<div class="flex flex-col gap-6 grow">
			<PresetsPicker />

			<div class="mx-3 flex flex-col gap-1.5">
				<Label>Colors</Label>
				<div class="border p-3 rounded-md flex items-center justify-center">
					<ColorOverview />
				</div>
			</div>

			<div class="flex flex-col"></div>

			<LanguageSelection />

			<div class="flex flex-col gap-1.5 px-3">
				<Label for="font selector">Font</Label>
				<Input
					id="font selector"
					value={"ui-monospace"}
					spellcheck="false"
					oninput={({ currentTarget: { value } }) => {
						document.documentElement.style.setProperty("--font-mono", value)
					}}
				/>
			</div>
		</div>

		<div class="absolute bg-mantle bottom-0 inset-x-0">
			<Separator class="" orientation="horizontal" />

			<div class="flex gap2 p4 justify-center items-center rounded-r-3xl">
				<Button
					class="flex gap-3 w-full"
					size="lg"
					variant="outline"
					aria-label="export"
					href="/export"
				>
					Export
					<div class="size-6 i-mingcute-file-export-line"></div>
				</Button>
			</div>
		</div>
	</aside>

	<div
		class="shrink-77 overflow-hidden justify-center items-center relative flex grow max-h-screen min-h-0"
	>
		{#if $activeColor && $activeColorHsl$}
			<!-- <div
				class="bg-gradient-to-t z-2 from-base h-45 via-base/70 pointer-events-none absolute bottom-0 w-full"
			></div> -->

			<div class="absolute flex flex-col items-center bottom-8 z-6 left-1/2 -translate-x-1/2">
				<ColorAdjustBar />
			</div>
		{/if}

		<div class="overflow-scroll grow max-h-screen">
			<CodeBlock />
		</div>
	</div>
</section>

<div
	class="bg-surface0 shrink-0 absolute right-0 top-1/2 -translate-y-1/2 rounded-3xl border grow-0"
></div>

<style>
	.stroke {
		/* -webkit-text-stroke: 8px theme("colors.crust"); */
		/* -webkit-text-fill-color: theme("colors.maroon"); */
		paint-order: stroke fill;
		/* text-shadow: 0.5rem 0.5rem 0 theme("colors.crust"); */
	}
</style>
