<script lang="ts">
	import * as Command from "$lib/components/ui/command/index.js"
	import * as Popover from "$lib/components/ui/popover/index.js"
	import { Button } from "$lib/components/ui/button/index.js"
	import { presets, presetToOkhsl } from "$lib/presets"
	import { colorsInput$ } from "$lib/state/colors"
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
								colorsInput$.next(presetToOkhsl(preset))
								// closeAndFocusTrigger(ids.trigger)
							}}
							class="justify-between"
						>
							<p>
								{preset.name}
							</p>
							<div class="flex gap-1">
								<div class="rounded-full size-2" style={`background: ${preset.colors.base}`}></div>
								<div class="rounded-full size-2" style={`background: ${preset.colors.text}`}></div>
								<div class="rounded-full size-2" style={`background: ${preset.colors.mauve}`}></div>
								<div class="rounded-full size-2" style={`background: ${preset.colors.blue}`}></div>
								<div class="rounded-full size-2" style={`background: ${preset.colors.green}`}></div>
								<div
									class="rounded-full size-2"
									style={`background: ${preset.colors.rosewater}`}
								></div>
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
