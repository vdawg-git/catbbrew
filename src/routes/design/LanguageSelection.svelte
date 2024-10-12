<script lang="ts">
	import { tick } from "svelte"
	import * as Command from "$lib/components/ui/command/index.js"
	import * as Popover from "$lib/components/ui/popover/index.js"
	import { Button } from "$lib/components/ui/button/index.js"
	import TypescriptIcon from "$lib/icons/typescript.svelte"
	import Rust from "$lib/icons/rust.svelte"

	type LanguageOption = { value: string; display: { label: string; icon: any } }

	const frameworks: LanguageOption[] = [
		{
			value: "typescript",
			display: { label: "Typescript", icon: TypescriptIcon }
		},
		{
			value: "rust",
			display: { label: "Rust", icon: Rust }
		}
	]

	let open = $state(false)
	let value = $state("typescript")

	let selectedValue = $derived(frameworks.find((f) => f.value === value))
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
			class="border-none size-10  p-0 m-0 justify-center"
		>
			{#if selectedValue}
				<selectedValue.display.icon class="size-7" />
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0 border-accent">
		<Command.Root>
			<!-- <Command.Input placeholder="Search framework..." /> -->
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each frameworks as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue
							closeAndFocusTrigger(ids.trigger)
						}}
					>
						<framework.display.icon class="mr-2 h-4 w-4" />
						{framework.display.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
