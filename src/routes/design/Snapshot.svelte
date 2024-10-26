<script lang="ts">
	import { snapshots, type Snapshot } from "$lib/state/snapshots.svelte"
	import { colors$, colorsInput$ } from "$lib/state/colors"
	import Label from "$lib/components/ui/label/label.svelte"

	function addSnapshot() {
		const toAdd = {
			colors: $colors$,
			timestamp: Date.now()
		}
		$snapshots = [toAdd, ...$snapshots]
	}

	function formatSnapshot(snapshot: Snapshot): string {
		const date = new Date(snapshot.timestamp)

		const hour = date.getHours()
		const minutes = date.getMinutes()
		return `${hour}:${minutes}:${date.getSeconds()} ${date.getDay()}`
	}
</script>

<div class="flex justify-between items-center">
	<Label size="xs" class="flex  justify-between">Snapshots</Label>

	<button
		class="hover:text-text text-subtext1 items-center flex gap-1 font-bold text-xs uppercase"
		onclick={() => addSnapshot()}
		>Add <div class="i-mingcute-plus-line size-4"></div></button
	>
</div>
{#if $snapshots.length > 0}
	<ul class="max-h-[200px] overflow-auto">
		{#each $snapshots as snapshot, i (snapshot.timestamp)}
			<li>
				<button
					onclick={() => {
						colorsInput$.next(snapshot.colors)
					}}
					class="hover:text-yellow text-text"
				>
					{formatSnapshot(snapshot)}
				</button>
			</li>
		{/each}
	</ul>
{/if}
