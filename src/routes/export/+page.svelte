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

<div class="flex gap-6 justify-start items-start flex-col flex-wrap">
	<div class="p-6 border rounded-2xl">
		<Collapsible.Root class="">
			<Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="default" class="gap-5">
					<Vscode class="size-8" />
					<h2>VS Code</h2>
				</Button>
			</Collapsible.Trigger>

			<Collapsible.Content class="space-y-2">
				Install the <a
					href="https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc"
					target="_blank">Catppuccin theme</a
				>
				and add this to your <code>settings.json</code>
				<pre><code>{createVsCodeSnippet()}</code></pre>
				<Button>Copy</Button>
			</Collapsible.Content>
		</Collapsible.Root>
	</div>

	<div class="p-6 border rounded-2xl">
		<Collapsible.Root class="">
			<Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="default" class="gap-5">
					<Vim class="size-8" />
					<h2>VS Code</h2>
				</Button>
			</Collapsible.Trigger>

			<Collapsible.Content class="space-y-2">
				Install the <a href="https://github.com/catppuccin/nvim">Catppuccin theme</a> and add this
				in the <code>setup call</code>.
				<pre><code>{createVsCodeSnippet()}</code></pre>
				<Button>Copy</Button>
			</Collapsible.Content>
		</Collapsible.Root>
	</div>
</div>

<style>
	a {
		color: theme("colors.subtext1");
		font-weight: medium;
	}

	pre {
		@apply rounded-lg bg-mantle p-4 text-sm;
	}
</style>
