<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import { Separator } from "$lib/components/ui/separator/index"
	import { activeColor$, colors$ } from "$lib/state/state"
	import type { ColorName } from "$lib/types"
	import { derived } from "svelte/store"
	import type { Okhsl } from "culori"

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
			}) as readonly [ColorName, Okhsl][]
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
			}) as readonly [ColorName, Okhsl][]
	)
</script>

<div
	class=" fixed transform-origin-t right-6 top-1/2 -translate-y-1/2 bg-surface0 items-center flex-col gap3 outline shadow-base shadow outline-border w-21 rounded-3xl w-max flex h-[90%] overflow-auto justify-stretch items-stretch flex flex-col rounded-3xl !p-0 m-0 z-10"
>
	<div class="gap5 flex grow p4 flex-col items-center">
		<div class="grid grid-cols-2 w-fit grid-rows-6">
			{#each $neutrals$ as [name, color], index (name)}
				<button
					aria-label="Change color of {name}"
					class="size-[2rem] min-w-[2rem] hover:outline-2 hover:outline outline-overlay1 active:outline-rosewater hover:z-2"
					class:rounded-tl-2xl={index === 0}
					class:rounded-tr-2xl={index === 1}
					class:rounded-bl-2xl={index === 10}
					class:rounded-br-2xl={index === 11}
					style="background: rgba(var(--{name}))"
					onclick={() => activeColor$.set(name)}
				></button>
			{/each}
		</div>

		<div class="grid grid-rows-7 grid-cols-2 w-fit">
			{#each $mainColors$ as [name, color], index (name)}
				<button
					aria-label="Change color of {name}"
					class="size-[2rem] min-w-[2rem] hover:outline-2 hover:outline outline-overlay1 active:outline-crust hover:z-2"
					class:rounded-tl-2xl={index === 0}
					class:rounded-tr-2xl={index === 1}
					class:rounded-bl-2xl={index === 12}
					class:rounded-br-2xl={index === 13}
					style="background: rgba(var(--{name}))"
					onclick={() => activeColor$.set(name)}
				></button>
			{/each}
		</div>
	</div>

	<div class="grow-0 shrink-0">
		<Separator class="" orientation="horizontal" />

		<div class="flex gap2 p4 justify-center items-center rounded-r-3xl">
			<!-- <Button class="rounded-full" variant="outline" size="icon" aria-label="shuffle">
<div class="size-6 i-solar-shuffle-outline"></div>
</Button> -->
			<Button class="rounded-full" variant="outline" size="icon" aria-label="export" href="/export">
				<div class="size-6 i-mingcute-file-export-line"></div>
			</Button>
		</div>
	</div>
</div>

{#snippet colorBox(color: string)}
	<div class="w-inherit h-inherit" style="background: {color}"></div>
{/snippet}
