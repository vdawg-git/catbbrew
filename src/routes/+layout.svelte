<script>
	import "@unocss/reset/tailwind.css"
	import Header from "./Header.svelte"
	import "virtual:uno.css"
	import "../app.css"
</script>

<div class="app h-full">
	<Header />

	<main class="h-full">
		<slot />
	</main>

	<footer class="">
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
