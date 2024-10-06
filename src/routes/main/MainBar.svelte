<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import { colors$ } from "$lib/state/state"
	import { derived } from "svelte/store"

	const colorsArray$ = derived(colors$, (colors) => Object.entries(colors))
	const baseColors$ = derived(colorsArray$, (colors) => colors.slice(0, 8))
	const mainColors$ = derived(colorsArray$, (colors) => colors.slice(8))
</script>

<div class="bg-secondary rounded-3xl min-w-max flex gap5 px6 py3">
	<div class="grid grid-cols-4 rounded-2xl overflow-hidden">
		{#each $baseColors$ as [name, color]}
			<div class="size-5">
				{@render colorBox(color)}
			</div>
		{/each}
	</div>

	<div class="flex rounded-2xl overflow-hidden">
		{#each $mainColors$ as [name, color]}
			<div class="size-10 min-w-10">
				{@render colorBox(color)}
			</div>
		{/each}
	</div>

	<div class="flex gap2">
		<Button class="rounded-full" variant="outline" size="icon" aria-label="shuffle">
			<div class="size-6 i-solar-shuffle-outline"></div>
		</Button>
		<Button class="rounded-full" variant="outline" size="icon" aria-label="export">
			<div class="size-6 i-solar-download-outline"></div>
		</Button>
	</div>
</div>

{#snippet colorBox(color: string)}
	<div class="w-inherit h-inherit" style="background: {color}"></div>
{/snippet}
