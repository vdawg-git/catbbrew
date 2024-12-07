<script lang="ts" module>
	const colorNames: readonly ColorName[] = Object.keys(flavors.mocha.colors) as ColorName[]

	const hexRgString = "#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3}"
	const colorNamesRg = `${colorNames.join("|")}`
	const extractRegex = new RegExp(`(${colorNamesRg}).+(${hexRgString})`)
</script>

<script lang="ts">
	import { type ColorName, flavors } from "@catppuccin/palette"
	import { Button, buttonVariants } from "$lib/components/ui/button"
	import { isNonNullish } from "remeda"
	import { colors$, colorsInput$ } from "$lib/state/colors"
	import { okhsl } from "culori"
	import { cn } from "$lib/utils"
	import * as Dialog from "$lib/components/ui/dialog"

	let importedColors: Map<ColorName, string> | undefined = $state(undefined)
	let isDragZone = $state(false)

	let isOpen = $state(false)

	function getColorsFromText(text: string): Map<ColorName, string> {
		return text
			.toLowerCase()
			.split("\n")
			.map(getColorFromLine)
			.filter(isNonNullish)
			.reduce(
				(acc, { name, color }) => {
					acc.set(name, color)
					return acc
				},
				new Map() as Map<ColorName, string>
			)
	}

	function getColorFromLine(line: string) {
		const matches = extractRegex.exec(line)

		if (!matches) return undefined

		return {
			name: matches[1]! as ColorName,
			color: matches[2]!
		}
	}

	export function show() {
		isOpen = true
	}
	export function hide() {
		isOpen = false
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener("keydown", handlePaste)
		} else {
			document.removeEventListener("keydown", handlePaste)
		}
	})

	$effect(() => {
		return () => document.removeEventListener("keydown", handlePaste)
	})

	async function handlePaste(e: KeyboardEvent) {
		if (e.key === "v" && e.ctrlKey) {
			e.preventDefault()
			const colors = await readColorsClipboard()
			importedColors = colors
		}
	}

	async function readColorsClipboard() {
		const text = await navigator.clipboard.readText().catch(() => undefined)
		if (!text) return
		return getColorsFromText(text)
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault()
		e.stopPropagation()
		isDragZone = true
	}
	function handleDragOut(e: DragEvent) {
		e.preventDefault()
		e.stopPropagation()
		isDragZone = false
	}
</script>

<Dialog.Root onOpenChange={(value) => (isOpen = value)}>
	<Dialog.Trigger
		class="text-subtext0 hover:text-text"
		aria-label="Import colors"
		title="Import colors"
	>
		<div class="i-mingcute-upload-2-line size-5"></div>
	</Dialog.Trigger>

	<Dialog.Content
		class="max-w-xl"
		role="dialog"
		ondragenter={handleDragOver}
		ondragover={handleDragOver}
		ondrop={async (e) => {
			e.stopPropagation()
			e.preventDefault()
			isDragZone = false
			const files = e.dataTransfer?.files
			if (!files || files.length === 0) return

			const text = await files[0].text().catch(() => undefined)
			if (!text) return
			importedColors = getColorsFromText(text)
		}}
		ondragexit={handleDragOut}
		ondragleave={handleDragOut}
	>
		<Dialog.Header>
			<Dialog.Title class="font-bold text-rosewater mb-5">Import colors 🎨</Dialog.Title>
			<Dialog.Description class="max-w-[60ch]">
				File should have each color name and its hex value on the <span class="text-yellow"
					>same line</span
				>.<br />
				Not all lines need to be colors, so you can just copy text blocks.
			</Dialog.Description>
		</Dialog.Header>

		<div class="flex flex-wrap gap-4 mt-5 items-center font-medium">
			<label
				class={cn(
					buttonVariants({
						variant: "outline",
						className: "p-4 border grow rounded-xl border-mauve"
					})
				)}
			>
				📁 Choose a file to import..
				<input
					type="file"
					class="sr-only"
					onchange={async (e) => {
						// @ts-ignore
						const file: File | undefined = e.target!.files?.[0]
						if (!file) return
						const text = await file.text().catch(() => undefined)
						if (!text) return
						importedColors = getColorsFromText(text)
					}}
				/>
			</label>
			<div class="p-4 rounded-xl grow -rotate-4">🖐🏻 Or drag-and-drop it 🖐🏻</div>
			<Button
				onclick={async () => {
					importedColors = await readColorsClipboard()
				}}
				variant="outline"
				class="border-sky rounded-xl">📋 Read from clipboard</Button
			>
			<span class="text-subtext1 -rotate-2">Pasting also works ✅</span>
		</div>

		{#if importedColors}
			<div class="flex gap-3 flex-wrap py-6">
				{#each importedColors as [name, color]}
					<div class="flex gap1 min-w-max rounded-full pr-2 pl1 items-center border">
						<div class="size-4 rounded-full" style:background={color}></div>
						<div class="">{name}</div>
						<div class="">{color}</div>
					</div>
				{:else}
					<span class="text-peach p-2"> No colors found in provided data :( </span>
				{/each}
			</div>
		{/if}

		<Dialog.Footer class="!justify-start ">
			<Button variant="link" class="mt-6" onclick={() => (isOpen = false)}>Cancel</Button>

			<Button
				onclick={() => {
					if (!importedColors) return
					const toImportOkhsl = importedColors
						.entries()
						.map(([name, color]) => [name, okhsl(color)])
						.filter(([, color]) => color)

					colorsInput$.next({ ...$colors$, ...Object.fromEntries(toImportOkhsl) })
				}}
				class="mt-6 bg-green hover:bg-blue disabled:bg-subtext1"
				disabled={!importedColors || importedColors.size === 0}>Import colors</Button
			>
		</Dialog.Footer>

		{#if isDragZone}
			<div class="absolute inset-0 bg-crust/10">Drop here :)</div>
		{/if}
	</Dialog.Content>
</Dialog.Root>

<!-- <dialog
	bind:this={modal}
	class="bg-base text-text border-2 p-8 rounded-2xl backdrop:bg-crust/60 backdrop:transition-all backdrop:transition-discrete starting:backdrop:bg-crust/01"
	onclose={() => (isOpen = false)}
>
</dialog> -->
