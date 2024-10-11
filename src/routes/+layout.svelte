<script lang="ts">
	import "@unocss/reset/tailwind.css"
	import Header from "./Header.svelte"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorHsl$, activeColor$, colors$ } from "$lib/state/state"
	import { cssVar } from "$lib/utils"
	import { Toaster } from "$lib/components/ui/sonner"
	import { type Okhsl } from "culori"

	function getActiveColorForeground(active: Okhsl) {
		const lightness = active.l
		const a = Math.abs(lightness - $colors$.base.l)
		const b = Math.abs(lightness - $colors$.text.l)

		const cssName = a > b ? "base" : "text"

		return cssVar(cssName)
	}
</script>

<Toaster />

<div
	class="app"
	style:--active-color={$activeColor$ && cssVar($activeColor$)}
	style:--active-colorForeground={$activeColorHsl$ && getActiveColorForeground($activeColorHsl$)}
>
	<Header />

	<main class="grow min-h-0 flex flex-col items-center justify-center">
		<slot />
	</main>
</div>

<style>
	.app {
		min-height: 100vh;
		height: 100vh;
		max-height: 100vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
</style>
