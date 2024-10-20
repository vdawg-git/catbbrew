<script lang="ts">
	import { activeColor } from "$lib/state/colors"
	import { language } from "$lib/state/language"
	import { fromStore } from "$lib/utils"
	import { debounceTime, filter, map, merge, share, Subject, switchMap } from "rxjs"
	import type { ColorName } from "@catppuccin/palette"
	import { highlighter } from "$lib/shiki"

	const languageText$ = fromStore(language).pipe(map(({ text }) => text))
	const codeInput$ = new Subject<string>()
	const code$ = codeInput$.pipe(debounceTime(1450))
	const toRender$ = merge(languageText$, code$).pipe(
		filter(Boolean),
		switchMap(async (text) => {
			const hl = await highlighter
			const toRender = hl
				.codeToHtml(text, { lang: $language.name, theme: "theme" })
				.replace(
					'class="shiki theme"',
					'contenteditable spellcheck="false" autocorrect="off" class="shiki theme"'
				)

			return toRender
		}),
		share()
	)
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="bg-base p6 [&_span:not(:has(span)):hover]:outline [&_span:not(:has(span)):hover]:outline-offset-2 font-mono [&_span:not(:has(span)):active]:bg-overlay1/20 [&_span:not(:has(span)):hover]:rounded !cursor-text ![&_pre]:outline-none"
	aria-label="Preview code"
	onclick={({ target }) => {
		if (!target || !("tagName" in target) || !("style" in target)) return
		if (target.tagName !== "SPAN") return

		const style = target.style as CSSStyleDeclaration
		const colorRg = /(?<=--).*(?=\)\))/
		const color = style.getPropertyValue("color").match(colorRg)?.[0]

		if (!color) return

		activeColor.set(color as ColorName)
	}}
	oninput={(e) => {
		codeInput$.next(e.currentTarget.innerText)
	}}
>
	{@html $toRender$}
</div>

<style>
</style>
