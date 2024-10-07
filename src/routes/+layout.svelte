<script>
	import "@unocss/reset/tailwind.css"
	import Header from "./Header.svelte"
	import "virtual:uno.css"
	import "../app.css"
	import { activeColorValue$ } from "$lib/state/state"
	import chroma from "chroma-js"
</script>

<div
	class="app"
	style:--active-color={$activeColorValue$ && chroma.hex($activeColorValue$).rgb().join(",")}
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
