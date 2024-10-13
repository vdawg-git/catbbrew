<script lang="ts">
	import "@fontsource/m-plus-rounded-1c/400.css"
	import "@fontsource/m-plus-rounded-1c/500.css"
	import "@fontsource/m-plus-rounded-1c/800.css"
	import "@unocss/reset/tailwind.css"
	import Header from "./Header.svelte"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorHsl$, activeColor$, colors$ } from "$lib/state/state"
	import { cssVar } from "$lib/utils"
	import { type Okhsl } from "culori"

	function getActiveColorForeground(active: Okhsl) {
		const lightness = active.l
		const a = Math.abs(lightness - $colors$.base.l)
		const b = Math.abs(lightness - $colors$.text.l)

		const cssName = a > b ? "base" : "text"

		return cssVar(cssName)
	}
</script>

<div
	class="min-h-screen flex flex-col font-sans"
	style:--active-color={$activeColor$ && cssVar($activeColor$)}
	style:--active-colorForeground={$activeColorHsl$ && getActiveColorForeground($activeColorHsl$)}
>
	<Header />

	<main class="grow min-h-0 flex flex-col items-center justify-center">
		<slot />
	</main>
</div>
