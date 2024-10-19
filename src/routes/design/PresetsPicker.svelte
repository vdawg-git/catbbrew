<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js"
	import * as Popover from "$lib/components/ui/popover/index.js"
	import { Button } from "$lib/components/ui/button/index.js"
	import { presets, presetToOkhsl } from "$lib/presets"
	import { setColors } from "$lib/state/colors"
	import Label from "$lib/components/ui/label/label.svelte"

	let activePreset = $state("Mocha")

	let open = $state(false)
</script>

<div class="w-full flex flex-col">
	<Label size="xs" class="ml-3">Presets</Label>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				size="sm"
				class="border-none flex gap-3 items-center group  justify-between  "
			>
				<div class="flex">
					{activePreset}
				</div>
				<div class="i-mingcute-down-line size-6 text-overlay0 group-hover:text-subtext1"></div>
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[280px] p-0 border-accent">
			<Command.Root>
				<!-- <Command.Input placeholder="Search framework..." /> -->
				<Command.Empty>Nothing here</Command.Empty>
				<Command.Group>
					{#each presets as preset}
						<Command.Item
							value={preset.name}
							onSelect={() => {
								activePreset = preset.name
								setColors(presetToOkhsl(preset))
								// closeAndFocusTrigger(ids.trigger)
							}}
						>
							{preset.name}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
