<script lang="ts">
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
	import Snapshot from "./Snapshot.svelte"
	import UploadModal from "./Upload.svelte"
	import { base } from "$app/paths"
	import SettingsModal from "./SettingsModal.svelte"
</script>

<svelte:head>
	<title>Color palette creator - Catbbrew</title>
	<meta name="description" content="Color palette creator based on Catppucin" />
</svelte:head>

<section class="flex relative max-h-screen overflow-clip grow min-h-0 min-w-0">
	<aside
		class="py-2 relative px-3 flex flex-col pb-24 overflow-auto justify-start gap-4 max-w-74 xl:max-w-80 bg-mantle min-h-0"
	>
		<div class="flex justify-between px-2 gap-6 mt-1">
			<a
				href="{base}/"
				class="text-stroke-text text-crust stroke text-stroke-4 hover:text-stroke-peach font-bold"
				>Catbbrew</a
			>
			<div class="grow"></div>

			<UploadModal />

			<SettingsModal />
		</div>

		<PresetsPicker />

		<div class="mx-3 flex items-start flex-col gap-1.5">
			<Label size="xs">Change colors</Label>
			<div class="p-3 border rounded-2xl">
				<ColorOverview
					vibrantsColumns={7}
					vibrantsRows={2}
					neutralsColumns={6}
					neutralsRows={2}
					class="flex-col p-0 gap-2 items-start"
				/>
			</div>
		</div>

		<Separator />
		<LanguageSelection />

		<div class="flex flex-col gap-1.5 px-3 grow">
			<Label for="font selector" size="xs">Change font</Label>
			<Input
				id="font selector"
				value={"ui-monospace"}
				spellcheck="false"
				oninput={({ currentTarget: { value } }) => {
					document.documentElement.style.setProperty("--font-mono", value)
				}}
				title="Change editor font"
			/>
		</div>

		<Separator />

		<Snapshot />

		<div class="absolute bg-mantle bottom-0 inset-x-0">
			<Separator class="" orientation="horizontal" />

			<div class="flex gap2 p4 justify-center items-center rounded-r-3xl">
				<Button
					class="flex gap-3 w-full"
					size="lg"
					variant="outline"
					aria-label="export"
					href="{base}/export"
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

		<div class="absolute bottom-8 right-8 z-30">
			<a
				href="https://github.com/vdawg-git/catbbrew"
				aria-label="Github"
				target="_blank"
				class=" i-mingcute-github-2-line text-subtext0 hover:text-text transition-colors size-7 block"
			></a>
		</div>

		<div class="overflow-scroll grow max-h-screen pb-20">
			<CodeBlock />
		</div>
	</div>
</section>

<style>
	.stroke {
		/* -webkit-text-stroke: 8px theme("colors.crust"); */
		/* -webkit-text-fill-color: theme("colors.maroon"); */
		paint-order: stroke fill;
		/* text-shadow: 0.5rem 0.5rem 0 theme("colors.crust"); */
	}
</style>
