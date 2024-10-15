<script lang="ts">
	import * as Collapsible from "$lib/components/ui/collapsible/index.js"

	import { Button } from "$lib/components/ui/button/index.js"
	import * as Card from "$lib/components/ui/card/index.js"
	import Vscode from "$lib/icons/vscode.svelte"
	import Vim from "$lib/icons/vim.svelte"
	import { colors$ } from "$lib/state/colors"
	import * as R from "remeda"
	import { formatHex } from "culori"
	import CollapsibleContent from "$lib/components/ui/collapsible/collapsible-content.svelte"
	import * as RadioGroup from "$lib/components/ui/radio-group/index.js"
	import Label from "$lib/components/ui/label/label.svelte"
	import type { Component } from "svelte"

	let selected = $state<SupportedExport>("vscode")

	type SupportedExport = "vscode" | "vim"
	type Exportable = {
		name: string
		Icon: Component
		value: SupportedExport
	}
	const exportables: readonly Exportable[] = [
		{
			name: "VSCode",
			value: "vscode",
			Icon: Vscode
		},
		{
			name: "(Neo)Vim",
			value: "vim",
			Icon: Vim
		}
	]

	let selectedData = $derived(exportables.find((item) => item.value === selected))!

	function createVsCodeSnippet() {
		return `catppuccin.colorOverrides": {
  "all": ${JSON.stringify(R.mapValues($colors$, formatHex), null, 4)},
},`
	}
	function createVimSnippet() {
		return `color_overrides = {
  all = {
${Object.entries($colors$)
	.map(([color, value]) => `    ${color} = ${formatHex(value)},`)
	.join("\n")}
  },
},`
	}
</script>

<svelte:head>
	<title>Export colors</title>
</svelte:head>

<div class="flex gap-6 flex-wrap w-full h-full">
	<div class="p-6">
		<Button onclick={() => window.history.back()}>Go back</Button>
		<div class="flex gap-3 items-center">
			<h1 class="font-bold text-xl text-rosewater">Export for your favorite editor</h1>
		</div>

		<div class="">
			{#each exportables as { name, value, Icon }}
				<label
					class="py-3 px-6 border-t flex [&:has(:selected)]:bg-red has-[:selected]:font-bold gap3 text-xl"
				>
					<input type="radio" bind:group={selected} {value} class="hiddenx checked:p-8" />
					<Icon class="size-6" />
					{name}
				</label>
			{/each}
		</div>
	</div>

	<div class="flex flex-col border-l p6 gap-6 grow">
		<div class="flex gap-3 items-center font-medium text-lg">
			<selectedData.Icon class="size-8" />
			<h2>{selectedData.name}</h2>
		</div>
		<div class="">
			{#if selected === "vscode"}
				Install the <a
					href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc"
					target="_blank">Catppuccin theme</a
				>
				and add this to your <code>settings.json</code>
				<pre><code>{createVsCodeSnippet()}</code></pre>
				<Button>Copy</Button>
			{:else if selected === "vim"}
				Install the <a href="https://github.com/catppuccin/nvim">Catppuccin theme</a> and add this
				in the <code>setup call</code>.
				<pre><code>{createVimSnippet()}</code></pre>
				<Button>Copy</Button>
			{/if}
		</div>
	</div>
</div>

<style>
	a {
		--at-apply: "text-blue font-medium hover:underline";
	}

	pre {
		@apply rounded-2xl my-4 bg-mantle p-4 text-sm border;
	}
</style>
