<script lang="ts">
	import { activeColor, colors$ } from "$lib/state/colors"
	import type { Okhsl } from "culori"
	import { cn } from "$lib/utils"
	import { map, startWith } from "rxjs"
	import type { ColorName } from "@catppuccin/palette"
	import clsx from "clsx"

	let {
		vibrantsColumns = 2,
		neutralsColumns = 2,
		vibrantsRows = 7,
		neutralsRows = 6,
		class: className = ""
	} = $props()

	const neutrals$ = colors$.pipe(
		map(
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
		),
		startWith([])
	)

	const mainColors$ = colors$.pipe(
		map(
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
		),
		startWith([])
	)

	function getEdge(
		index: number,
		rows: number,
		cols: number
	): "top-left" | "top-right" | "bottom-left" | "bottom-right" | undefined {
		const row = Math.floor(index / cols)
		const col = index % cols

		if (row === 0) {
			if (col === 0) return "top-left"
			if (col === cols - 1) return "top-right"
		} else if (row === rows - 1) {
			if (col === 0) return "bottom-left"
			if (col === cols - 1) return "bottom-right"
		}
	}
</script>

<div class={cn("gap-5 flex grow p-4 items-start max-w-max", className)}>
	<div
		class="grid w-fit"
		style="grid-template-columns: repeat({vibrantsColumns}, 1fr); grid-template-rows: repeat({vibrantsRows}, 1fr);"
	>
		{#each $mainColors$ as [name, color], index (name)}
			{@const isActive = name === $activeColor}

			<button
				aria-label="Change color of {name}"
				class={clsx(
					"size-[2rem] min-w-[2rem] transition-transform  ",
					isActive
						? "scale-122  ease-out z-2 pop-ease pop-ease duration-500 "
						: "hover:scale-110 transition-transform duration-122"
				)}
				class:rounded-tl-2xl={getEdge(index, vibrantsRows, vibrantsColumns) === "top-left"}
				class:rounded-tr-2xl={getEdge(index, vibrantsRows, vibrantsColumns) === "top-right"}
				class:rounded-bl-2xl={getEdge(index, vibrantsRows, vibrantsColumns) === "bottom-left"}
				class:rounded-br-2xl={getEdge(index, vibrantsRows, vibrantsColumns) === "bottom-right"}
				style="background: rgba(var(--{name})); outline-color: rgba(var(--{name}));"
				onclick={() => activeColor.set(name)}
			></button>
		{/each}
	</div>

	<div
		class="grid w-fit"
		style="grid-template-columns: repeat({neutralsColumns}, 1fr); grid-template-rows: repeat({neutralsRows}, 1fr);"
	>
		{#each $neutrals$ as [name, color], index (name)}
			{@const isActive = name === $activeColor}
			<button
				aria-label="Change color of {name}"
				class={clsx(
					"size-[2rem] min-w-[2rem] transition-transform  ",
					isActive
						? "scale-122  ease-out z-2 pop-ease pop-ease duration-500 "
						: "hover:scale-110 transition-transform duration-122"
				)}
				class:rounded-tl-2xl={getEdge(index, neutralsRows, neutralsColumns) === "top-left"}
				class:rounded-tr-2xl={getEdge(index, neutralsRows, neutralsColumns) === "top-right"}
				class:rounded-bl-2xl={getEdge(index, neutralsRows, neutralsColumns) === "bottom-left"}
				class:rounded-br-2xl={getEdge(index, neutralsRows, neutralsColumns) === "bottom-right"}
				style="background: rgba(var(--{name}))"
				onclick={() => activeColor.set(name)}
			></button>
		{/each}
	</div>
</div>

<style>
	.pop-ease {
		transition-timing-function: cubic-bezier(0.975, 0, 0.62, 3);
	}
</style>
