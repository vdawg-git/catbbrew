<script lang="ts">
	import { colors$ } from "$lib/state/state"
	import { derived } from "svelte/store"

	const colorsArray$ = derived(colors$, (colors) => Object.entries(colors))
	const baseColors$ = derived(colorsArray$, (colors) => colors.toSpliced(0, 8))
	const mainColors$ = derived(colorsArray$, (colors) => colors.toSpliced(8))
</script>

<div class="bg-neutral-2 rounded-3xl flex gap5 px6 py3">
	<div class="grid grid-cols-4 rounded-2xl overflow-hidden">
		{#each $baseColors$ as [name, color]}
			<div class="size-5">
				{@render colorBox(color)}
			</div>
		{/each}
	</div>

	<div class="flex rounded-2xl overflow-hidden">
		{#each $mainColors$ as [name, color]}
			<div class="size-10">
				{@render colorBox(color)}
			</div>
		{/each}
	</div>

	<div class=""></div>
</div>

{#snippet colorBox(color: string)}
	<div class="w-inherit h-inherit" style="background: {color}"></div>
{/snippet}
