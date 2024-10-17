<script lang="ts">
	import { tick } from "svelte"
	import * as Command from "$lib/components/ui/command/index.js"
	import * as Popover from "$lib/components/ui/popover/index.js"
	import { Button } from "$lib/components/ui/button/index.js"
	import { setLanguage, language, languages, type LanguageName } from "$lib/state/language"

	let Icon = $derived($language.icon)

	let open = $state(false)
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false
		tick().then(() => {
			document.getElementById(triggerId)?.focus()
		})
	}
</script>

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
				<Icon class="size-6" />
				{$language.display}
			</div>
			<div class="i-mingcute-down-line size-6 text-overlay0 group-hover:text-subtext1"></div>
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0 border-accent">
		<Command.Root>
			<!-- <Command.Input placeholder="Search framework..." /> -->
			<Command.Empty>Nothing here</Command.Empty>
			<Command.Group>
				{#each Object.entries(languages) as [name_, data]}
					<Command.Item
						value={name_}
						onSelect={(currentValue) => {
							setLanguage(currentValue as LanguageName)
							closeAndFocusTrigger(ids.trigger)
						}}
					>
						<data.icon class="mr-2 h-4 w-4" />
						{data.display}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
