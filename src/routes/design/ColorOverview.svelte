<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import { Separator } from "$lib/components/ui/separator/index"
	import { activeColor$, colors$ } from "$lib/state/colors"
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

<div class="gap5 flex grow p4 items-start">
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
</div>
