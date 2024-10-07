<script lang="ts">
	import { codeToHtml } from "shiki"

	const code = `
import { createHighlighter } from 'shiki'

// \`createHighlighter\` is async, it initializes the internal and
// loads the themes and languages specified.
const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript'],
})

// then later you can use \`highlighter.codeToHtml\` synchronously
// with the loaded themes and languages.
const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})`
</script>

<div class="max-w-5xl text-lg overflow-hidden">
	{#await codeToHtml(code, { lang: "ts", theme: "catppuccin-macchiato" }) then html}
		{@html html}
	{/await}
</div>
