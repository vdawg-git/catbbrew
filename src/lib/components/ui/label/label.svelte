<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui"
	import { cn } from "$lib/utils.js"
	import { tv, type VariantProps } from "tailwind-variants"
	import type { Snippet } from "svelte"

	const labelVariants = tv({
		base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		variants: {
			size: {
				default: "",
				xs: "text-xs text-subtext1 tracking-[0.015em] font-bold "
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	})

	type Props = LabelPrimitive.Props & {
		size?: VariantProps<typeof labelVariants>["size"]
		children: Snippet
	}

	let { size, class: className, children, ...restProps }: Props = $props()
</script>

<LabelPrimitive.Root {...restProps} class={cn(labelVariants({ size, className }))} on:mousedown>
	{@render children()}
</LabelPrimitive.Root>
