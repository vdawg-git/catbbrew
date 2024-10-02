<script lang="ts">
	import { codeToHtml } from "shiki"

	const code = `const array: number[] = Array(10) // array size is 10
  .fill(undefined)
  .map(() => 50 * Math.random()); // numbers from 0-50 (exclusive)

console.log(array);`
</script>

<div class="text-xl">
	{#await codeToHtml(code, { lang: "ts", theme: "tokyo-night" }) then html}
		{@html html}
	{/await}
</div>
