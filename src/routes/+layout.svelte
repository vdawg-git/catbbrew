<script lang="ts">
	import "@fontsource/m-plus-rounded-1c/400.css"
	import "@fontsource/m-plus-rounded-1c/500.css"
	import "@fontsource/m-plus-rounded-1c/800.css"
	import "@unocss/reset/tailwind.css"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorHsl$, activeColor, colors$, colorsInput$ } from "$lib/state/colors"
	import { cssVar } from "$lib/utils"
	// import { Toaster } from "svelte-sonner"
	import { type Okhsl } from "culori"
	import Button from "$lib/components/ui/button/button.svelte"

	let { children } = $props()

	function getActiveColorForeground(active: Okhsl) {
		const lightness = active.l
		const a = Math.abs(lightness - $colors$.base.l)
		const b = Math.abs(lightness - $colors$.text.l)

		const cssName = a > b ? "base" : "text"

		return cssVar(cssName)
	}

	let smallScreenDialog: HTMLDialogElement
	let restoreColorsDialog: HTMLDialogElement

	$effect(() => {
		if (window.innerWidth < 640) {
			smallScreenDialog.showModal()
		}

		if (localStorage.getItem("colors")) {
			restoreColorsDialog.showModal()
		}
	})
</script>

<noscript class="fixed inset-0 bg-crust/40"
	>You need to enable JavaScript to run this app.
</noscript>

<!-- <Toaster /> -->

<div
	class="min-h-screen flex flex-col max-h-screen h-screen font-sans"
	style:--active-color={$activeColor && cssVar($activeColor)}
	style:--active-colorForeground={$activeColorHsl$ && getActiveColorForeground($activeColorHsl$)}
>
	<main class="grow min-h-0 flex flex-col">
		{@render children()}
	</main>
</div>

<dialog bind:this={restoreColorsDialog} class="bg-transparent border-none">
	<div class="bg-base rounded-2xl border-2 border-subtext0 p-6 flex flex-col gap-6">
		<h1 class="text-lg text-rosewater">Restore colors of last session?</h1>
		<div class="flex gap-6">
			<form method="dialog">
				<Button
					variant="link"
					onclick={() => {
						restoreColorsDialog.close()
						localStorage.removeItem("colors")
					}}>Nope</Button
				>
			</form>
			<Button
				autofocus
				onclick={() => {
					const saved = localStorage.getItem("colors")
					if (saved) {
						const colors = JSON.parse(saved)
						colorsInput$.next(colors)
						restoreColorsDialog.close()
					}
					restoreColorsDialog.close()
				}}>Restore colors</Button
			>
		</div>
	</div>
</dialog>

<dialog bind:this={smallScreenDialog} class="bg-transparent">
	<div
		class="border-5 flex flex-col gap-5 rounded-xl text-xl border-red px-6 py-3 bg-crust text-rosewater"
	>
		This app does not work properly on small screens.

		<form method="dialog"><Button onclick={() => smallScreenDialog.close()}>Okay</Button></form>
	</div>
</dialog>

<style>
	::backdrop {
		background-color: theme("colors.crust");
		opacity: 0.5;
	}
</style>
