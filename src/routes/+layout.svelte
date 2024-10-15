<script lang="ts">
	import "@fontsource-variable/m-plus-code-latin"
	import "@fontsource/m-plus-rounded-1c/400.css"
	import "@fontsource/m-plus-rounded-1c/500.css"
	import "@fontsource/m-plus-rounded-1c/800.css"
	import "@unocss/reset/tailwind.css"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorHsl$, activeColor$, colors$ } from "$lib/state/colors"
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
	class="min-h-screen flex flex-col max-h-screen h-screen font-sans"
	style:--active-color={$activeColor$ && cssVar($activeColor$)}
	style:--active-colorForeground={$activeColorHsl$ && getActiveColorForeground($activeColorHsl$)}
>
	<main class="grow min-h-0 flex flex-col">
		<slot />
	</main>
</div>
