<script lang="ts">
	import "@fontsource/m-plus-rounded-1c/400.css"
	import "@fontsource/m-plus-rounded-1c/500.css"
	import "@fontsource/m-plus-rounded-1c/800.css"
	import "@unocss/reset/tailwind.css"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorHsl$, activeColor, colors$ } from "$lib/state/colors"
	import { cssVar } from "$lib/utils"
	// import { Toaster } from "svelte-sonner"
	import { type Okhsl } from "culori"
	import Button from "$lib/components/ui/button/button.svelte"

	function getActiveColorForeground(active: Okhsl) {
		const lightness = active.l
		const a = Math.abs(lightness - $colors$.base.l)
		const b = Math.abs(lightness - $colors$.text.l)

		const cssName = a > b ? "base" : "text"

		return cssVar(cssName)
	}

	let smallScreenDialog: HTMLDialogElement

	$effect(() => {
		if (window.innerWidth < 640) {
			smallScreenDialog.showModal()
		}
	})
</script>

<noscript class="fixed inset-0 bg-crust/40"
	>You need to enable JavaScript to run this app.
</noscript>

<!-- <Toaster /> -->
<dialog bind:this={smallScreenDialog} class="bg-transparent">
	<div
		class="border-5 flex flex-col gap-5 rounded-xl text-xl border-red px-6 py-3 bg-crust text-rosewater"
	>
		This app does not work properly on small screens.

		<form method="dialog"><Button onclick={() => smallScreenDialog.close()}>Okay</Button></form>
	</div>
</dialog>

<div
	class="min-h-screen flex flex-col max-h-screen h-screen font-sans"
	style:--active-color={$activeColor && cssVar($activeColor)}
	style:--active-colorForeground={$activeColorHsl$ && getActiveColorForeground($activeColorHsl$)}
>
	<main class="grow min-h-0 flex flex-col">
		<slot />
	</main>
</div>

<style>
	::backdrop {
		background-color: theme("colors.crust");
		opacity: 0.5;
	}
</style>
