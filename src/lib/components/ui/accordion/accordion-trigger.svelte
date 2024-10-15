<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui"
	import { cn } from "$lib/utils.js"

	type $$Props = AccordionPrimitive.TriggerProps
	type $$Events = AccordionPrimitive.TriggerEvents

	let className: $$Props["class"] = undefined
	export let level: AccordionPrimitive.HeaderProps["level"] = 3
	export { className as class }
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		class={cn(
			"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
			className
		)}
		{...$$restProps}
		on:click
	>
		<slot />
		<div class="i-mingcute-down-line h-4 w-4 transition-transform duration-200"></div>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
