<script>
	import { page } from "$app/stores"
</script>

<header class="flex items-center justify-center w-full">
	<div class="max-w-screen-sm flex items-center justify-between w-full px-4 py-2">
		<div class="">
			<a href="/"> hii </a>
		</div>

		<ul class="flex gap-2 text-neutral-5">
			<li>
				<button class="p2 hover:text-neutral-6" aria-label="Toggle dark and light mode">
					<div class="i-mingcute-sun-line size-6"></div>
				</button>
			</li>
			<li>
				<button class="p2 hover:text-neutral-6" aria-label="Open settings">
					<div class="i-mingcute-settings-3-line size-6"></div>
				</button>
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
