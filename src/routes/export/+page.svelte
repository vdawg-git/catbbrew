<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js"
	import Vscode from "$lib/icons/vscode.svelte"
	import Vim from "$lib/icons/vim.svelte"
	import { colors$ } from "$lib/state/colors"
	import * as R from "remeda"
	import { formatHex } from "culori"
	import type { Component } from "svelte"
	import { highlighter } from "$lib/shiki"
	import File from "$lib/icons/_file.svelte"
	import { copyToClipboard } from "$lib/utils"

	let selected = $state<SupportedExport>("vscode")

	type SupportedExport = "vscode" | "vim" | "filetypes"
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
		},
		{
			name: "Filetypes",
			value: "filetypes",
			Icon: File
		}
	]

	let selectedData = $derived(exportables.find((item) => item.value === selected))!

	function createVsCodeSnippet() {
		return highlighter.codeToHtml(
			`"catppuccin.colorOverrides": {
  "all": ${JSON.stringify(R.mapValues($colors$, formatHex), null, 4)},
},`,
			{ lang: "json", theme: "theme" }
		)
	}
	function createVimSnippet() {
		return highlighter.codeToHtml(
			`color_overrides = {
  all = {
${Object.entries($colors$)
	.map(([color, value]) => `    ${color} = "${formatHex(value)}",`)
	.join("\n")}
  },
},`,
			{ lang: "lua", theme: "theme" }
		)
	}

	function createAppSnippet() {
		return highlighter.codeToHtml(
			Object.entries($colors$)
				.map(([key, value]) => `${key}="${formatHex(value)}"`)
				.join("\n"),
			{ lang: "bash", theme: "theme" }
		)
	}
</script>

<svelte:head>
	<title>Export colors</title>
</svelte:head>

<div class="flex flex-wrap max-w-screen flex-nowrap max-h-screen overflow-hidden">
	<div class="border-r shrink-0">
		<div class="flex px-6 py-3 gap-4 items-center">
			<button onclick={() => window.history.back()}
				><span class="sr-only">Go back</span>
				<div class="i-mingcute-arrow-left-line size-5"></div>
			</button>

			<h1 class="font-bold text-size-base text-rosewater">Export palette</h1>
		</div>

		<div class="">
			{#each exportables as { name, value, Icon }}
				<label class="py-3 px-6 border-t flex label gap3 text-subtext1">
					<input type="radio" bind:group={selected} {value} class="" />
					<Icon class="size-6" />
					{name}
				</label>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-6 grow relative">
		<div
			class="flex gap-3 items-center font-medium p-6 w-full text-lg absolute top-0 left-0 bg-base"
		>
			<selectedData.Icon class="size-8" />
			<h2>{selectedData.name}</h2>
		</div>

		<div
			class="[&_pre]:rounded-2xl [&_pre]:my-4 p-6 [&_pre]:bg-mantle [&_pre]:p-4 [&_pre]:text-sm [&_pre]:border mt-14 overflow-auto"
		>
			{#if selected === "vscode"}
				Install the <a
					href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc"
					target="_blank">Catppuccin theme</a
				>
				and add this to your <code>settings.json</code>

				{@render Code(createVsCodeSnippet())}
			{:else if selected === "vim"}
				Install the <a href="https://github.com/catppuccin/nvim">Catppuccin theme</a> and add this
				in the <code>setup call</code>.

				{@render Code(createVimSnippet())}
			{:else if selected === "filetypes"}
				<!-- TODO add JSON, Bash, Toml, yaml. Prop with some lib to have nicer formatting. Or maybe with Prettier? -->
				All formats can be imported into the app again, as long as the color name is on the same line
				as the hex hex value.

				{@render Code(createAppSnippet())}
			{/if}
		</div>
	</div>
</div>

{#snippet Code(codeToRender: string)}
	<div class="flex flex-col gap-3">
		{@html codeToRender}
		<Button onclick={() => copyToClipboard(codeToRender)}>Copy</Button>
	</div>
{/snippet}

<style>
	a {
		--at-apply: "text-blue font-medium hover:underline";
	}

	.label:has(:checked) {
		--at-apply: text-yellow;
	}

	.label input {
		display: none;
	}
</style>
