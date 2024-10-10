<script lang="ts">
	import "@unocss/reset/tailwind.css"
	import Header from "./Header.svelte"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorRgb$, activeColorHsl$, activeColor$, colors$ } from "$lib/state/state"
	import { cssVar, fromStore } from "$lib/utils"
</script>

<div
	class="app"
	style:--active-color={$activeColor$ && cssVar($activeColor$)}
	style:--active-colorForeground={$activeColorHsl$ &&
		($activeColorHsl$.l > 0.5 ? cssVar("background") : cssVar("foreground"))}
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
