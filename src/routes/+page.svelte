<script>
	import CodeBlock from "./main/CodeBlock.svelte"
	import MainBar from "./main/MainBar.svelte"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col items-center justify-center h-full w-full">
	<CodeBlock />
</section>

<div class="fixed bottom-8 left-1/2 -translate-x-1/2">
	<MainBar />
</div>

<style></style>
