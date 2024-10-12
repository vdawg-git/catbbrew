<script>
	import { page } from "$app/stores"
</script>

<header class="flex items-center justify-center w-full">
	<div class="max-w-screen-sm flex items-center justify-between w-full px-4 py-2">
		<div class="text-center text-lg">
			<a href="/">Bbrew</a>
		</div>

		<ul class="flex gap-2 text-neutral-5">
			<li>
				<a
					href="https://github.com/vdawg-git/bbrew"
					class="p2 text-subtext0 hover:text-subtext1"
					aria-label="Toggle dark and light mode"
				>
					<div class="i-mingcute-github-2-line size-6"></div>
				</a>
			</li>
		</ul>

		<!-- <nav>
<ul>
<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
<a href="/">Home</a>
</li>
<li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
<a href="/about">About</a>
</li>
<li aria-current={$page.url.pathname.startsWith("/sverdle") ? "page" : undefined}>
<a href="/sverdle">Sverdle</a>
</li>
</ul>
</nav> -->
	</div>
</header>

<style></style>
