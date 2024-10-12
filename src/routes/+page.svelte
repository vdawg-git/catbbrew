<script>
	import Button from "$lib/components/ui/button/button.svelte"
</script>

<svelte:head>
	<title>Home</title>
	<meta
		name="description"
		content="Catbrew, brew your own flavor. A color scheme generator based on Catppuccin."
	/>
</svelte:head>

<section
	class="flex flex-col relative h-full items-center justify-center max-h-full grow min-h-0 min-w-0"
>
	<h1>Create your own color theme</h1>
	<p>Based on the awesome Catppuccin theme</p>

	<Button>Create your own flavor</Button>
</section>

<style></style>
