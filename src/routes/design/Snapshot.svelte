<script lang="ts">
	import { activeSnapshot, activeSnapshotId, snapshots } from "$lib/state/snapshots.svelte"
	import { tick } from "svelte"
	import * as Command from "$lib/components/ui/command/index.js"
	import * as Popover from "$lib/components/ui/popover/index.js"
	import { Button } from "$lib/components/ui/button/index.js"
	import { colors$ } from "$lib/state/colors"

	let open = $state(false)
	// let {} = $props()

	function closeAndFocusTrigger(triggerId: string) {
		open = false
		tick().then(() => {
			document.getElementById(triggerId)?.focus()
		})
	}
</script>

<Button
	onclick={() => {
		const id = crypto.randomUUID()
		$snapshots[id] = {
			timestamp: new Date().toISOString(),
			colors: $colors$
		}
		$snapshots = $snapshots
		open = true
	}}>Add snapshot</Button
>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			size="sm"
			class="border-none flex group  justify-between  "
		>
			<div class="flex gap-3 items-center">
				{#if $activeSnapshot}
					{$activeSnapshot?.name ?? $activeSnapshot.timestamp}
				{:else}
					No snapshots. Should not happen here
				{/if}
			</div>
			<div class="i-mingcute-down-line size-6 text-overlay0 group-hover:text-subtext1"></div>
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0 border-accent">
		<Command.Root>
			<!-- <Command.Input placeholder="Search framework..." /> -->
			<Command.Empty>Nothing here</Command.Empty>
			<Command.Group>
				{#each Object.entries($snapshots) as [id, snapshot]}
					<Command.Item
						value={id}
						onSelect={() => {
							$activeSnapshotId = id
							closeAndFocusTrigger(ids.trigger)
						}}
					>
						{snapshot.name ?? snapshot.timestamp}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
