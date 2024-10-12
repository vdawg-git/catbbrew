<script lang="ts">
</script>

<div class="app">
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
