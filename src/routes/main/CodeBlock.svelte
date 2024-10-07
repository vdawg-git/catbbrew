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

type Highlighter = ReturnType<typeof createHighlighter>
const regex = /([A-Z])\w+/g
const a = 1 + 1

// then later you can use \`highlighter.codeToHtml\` synchronously
// with the loaded themes and languages.
const code = highlighter.codeToHtml('const a = 1', {
  lang: 'javascript',
  theme: 'nord'
})

import { type VariantProps, tv } from "tailwind-variants"
import type { Button as ButtonPrimitive } from "bits-ui"
import Root from "./button.svelte"

const buttonVariants = tv({
	base: "",
	variants: {
		variant: {
			default:
				"bg-primary  text-base0/50",
			destructive: "bg-destructive  hover:bg-destructive/90",
			outline: "border-input   hover:text-accent-foreground border",
			secondary: "bg-secondary  hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary  hover:underline"
		},
		size: {
			default: "h-10 px-4 py-2",
			sm: "h-9 rounded-md px-3",
			lg: "h-11 rounded-md px-8",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
})

type Variant = VariantProps<typeof buttonVariants>["variant"]
type Size = VariantProps<typeof buttonVariants>["size"]

type Props = ButtonPrimitive.Props & {
	variant?: Variant
	size?: Size
}

type Events = ButtonPrimitive.Events

export {
	Root,
	type Props,
	type Events,
	//
	Root as Button,
	type Props as ButtonProps,
	type Events as ButtonEvents,
	buttonVariants
}

`
</script>

<div class="text-base !cursor-text" aria-label="Preview code">
	{#await codeToHtml(code, { lang: "ts", theme: "catppuccin-macchiato" }) then html}
		{@html html}
	{/await}
</div>
