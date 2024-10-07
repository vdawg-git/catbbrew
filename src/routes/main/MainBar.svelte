<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import { Separator } from "$lib/components/ui/separator/index"
	import { activeColor$, colors$ } from "$lib/state/state"
	import type { ColorName } from "$lib/types"
	import { derived } from "svelte/store"

	const neutrals$ = derived(
		colors$,
		({
			crust,
			mantle,
			base,
			surface0,
			surface1,
			surface2,
			overlay0,
			overlay1,
			overlay2,
			subtext0,
			subtext1,
			text
		}) =>
			Object.entries({
				crust,
				mantle,
				base,
				surface0,
				surface1,
				surface2,
				overlay0,
				overlay1,
				overlay2,
				subtext0,
				subtext1,
				text
			}) as readonly [ColorName, string][]
	)
	const mainColors$ = derived(
		colors$,
		({
			lavender,
			blue,
			sapphire,
			sky,
			teal,
			green,
			yellow,
			peach,
			maroon,
			red,
			mauve,
			pink,
			flamingo,
			rosewater
		}) =>
			Object.entries({
				lavender,
				blue,
				sapphire,
				sky,
				teal,
				green,
				yellow,
				peach,
				maroon,
				red,
				mauve,
				pink,
				flamingo,
				rosewater
			}) as readonly [ColorName, string][]
	)
</script>

{#if $activeColor$}
	<div
		class="bg-surface0 mb4 items-center gap3 outline shadow-base shadow outline-activeColor rounded-3xl min-w-max flex"
	>
		{$activeColor$}
	</div>
{/if}

<div
	class="bg-surface0 items-center gap3 outline shadow-base shadow outline-border h-21 rounded-3xl min-w-max flex"
>
	<div class="gap5 flex pl4">
		<div class="grid grid-cols-6 grid-rows-2">
			{#each $neutrals$ as [name, color], index (name)}
				<button
					aria-label="Change color of {name}"
					class="size-[1.875rem] min-w-[1.875rem] hover:outline-2 hover:outline outline-overlay1 active:outline-rosewater hover:z-2"
					class:rounded-tl-2xl={index === 0}
					class:rounded-tr-2xl={index === 5}
					class:rounded-bl-2xl={index === 6}
					class:rounded-br-2xl={index === 11}
					style="background: rgba(var(--{name}))"
					onclick={() => activeColor$.set(name)}
				></button>
			{/each}
		</div>

		<div class="grid grid-rows-2 grid-cols-7 w-fit">
			{#each $mainColors$ as [name, color], index (name)}
				<button
					aria-label="Change color of {name}"
					class="size-[1.875rem] min-w-[1.875rem] hover:outline-2 hover:outline outline-overlay1 active:outline-crust hover:z-2"
					class:rounded-tl-2xl={index === 0}
					class:rounded-tr-2xl={index === 6}
					class:rounded-bl-2xl={index === 7}
					class:rounded-br-2xl={index === 13}
					style="background: rgba(var(--{name}))"
					onclick={() => activeColor$.set(name)}
				></button>
			{/each}
		</div>
	</div>

	<Separator class="" orientation="vertical" />

	<div class="flex gap2 h-full pr4 items-center rounded-r-3xl">
		<!-- <Button class="rounded-full" variant="outline" size="icon" aria-label="shuffle">
			<div class="size-6 i-solar-shuffle-outline"></div>
		</Button> -->
		<Button class="rounded-full" variant="outline" size="icon" aria-label="export">
			<div class="size-6 i-solar-download-outline"></div>
		</Button>
	</div>
</div>

{#snippet colorBox(color: string)}
	<div class="w-inherit h-inherit" style="background: {color}"></div>
{/snippet}
