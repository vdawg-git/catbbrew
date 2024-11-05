<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import { highlight } from "$lib/shiki"
	import { colors$ } from "$lib/state/colors"
	import { copyToClipboard } from "$lib/utils"
	import type { Snippet } from "./snippets"

	let props: { snippet: Snippet } = $props()

	let code = $derived(props.snippet.code($colors$))
	let htmlToRender$ = $derived(highlight(code, props.snippet.language))

	// Extra component bc we need to declare the observable on the top to subscribe to it in the markup
</script>

<div class="flex flex-col gap-3 min-h-60 h-80">
	{@html $htmlToRender$}

	<Button
		onclick={() => copyToClipboard(code)}
		class="justify-self-end grid-justify-self-end   flex-justify-self-end flex-self-end place-self-end"
		>Copy</Button
	>
</div>
