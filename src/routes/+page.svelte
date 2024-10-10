<script>
	import Button from "$lib/components/ui/button/button.svelte"
	import { activeColor$ } from "$lib/state/state"
	import CodeBlock from "./main/CodeBlock.svelte"
	import ColorAdjustBar from "./main/ColorAdjustBar.svelte"
	import MainBar from "./main/MainBar.svelte"
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section
	class="flex flex-col relative h-full items-center justify-center max-h-full grow min-h-0 min-w-0"
>
	<aside
		class="absolute px2 py4 flex flex-col items-center justify-center bg-mantle -left-12 top-[max(11vh,2rem)] rounded-2xl"
	>
		<Button>TS</Button>
	</aside>

	<div
		class="bg-gradient-to-t z-2 from-base h-45 via-base/70 pointer-events-none absolute bottom-0 w-full"
	></div>
	<div class="bg-gradient-to-b z-2 from-base h-6 absolute top-0 pointer-events-none w-full"></div>

	<div
		class="max-w-screen-xl pb-40 px-16 pt-[max(11vh,2rem)] flex justify-center items-start overflow-scroll w-full max-h-full min-h-0 overflow-scroll"
	>
		<CodeBlock />
	</div>
</section>

<nav class="fixed left-8 top-1/2 -translate-y-1/2">
	<MainBar />
</nav>

<div class="fixed flex flex-col items-center bottom-4 z-6 left-1/2 -translate-x-1/2">
	{#if $activeColor$}
		<ColorAdjustBar />
	{/if}
</div>

<style></style>
