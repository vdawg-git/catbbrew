import { compile } from "@catppuccin/vscode"
import { createRgbaVar } from "./utils"
import { createHighlighter, type ThemeRegistration } from "shiki"
import { languages } from "$lib/state/language"
import { mocha } from "./presets"
import type { ColorName } from "@catppuccin/palette"
import { filter, map, shareReplay, startWith, Subject, switchMap, type Observable } from "rxjs"
import { pipe } from "remeda"

const shiki = compile("mocha", {
	colorOverrides: {
		all: Object.fromEntries(
			Object.keys(mocha.colors).map((name_) => {
				return [name_, createRgbaVar(name_ as ColorName)]
			})
		)
	}
})

const catppuccinHighlighting: ThemeRegistration = {
	...shiki,
	fg: createRgbaVar("text"),
	bg: createRgbaVar("background"),
	type: "dark",
	name: "theme",
	semanticTokenColors: {}
}

export const syntaxThemeInput$ = new Subject<string>()

const syntaxTheme$: Observable<ThemeRegistration> = syntaxThemeInput$.pipe(
	map(vsCodeThemeToShiki),
	filter(Boolean),
	startWith(catppuccinHighlighting)
)
const highligher$ = syntaxTheme$.pipe(
	switchMap((theme) =>
		createHighlighter({
			themes: [theme],
			langs: [...Object.keys(languages), "json", "lua", "bash"]
		})
	),
	shareReplay(1)
)

// it should return a function which given text returns an observable with the
// highlighted code, but it updates by itself if a new syntax theme was given
export const highlight = (code: string, lang: string) => {
	return highligher$.pipe(
		map((hl) => hl.codeToHtml(code, { lang, theme: "theme", mergeWhitespaces: "never" })),
		shareReplay({ bufferSize: 1, refCount: true })
	)
}

const mochaColors = mocha.colors
const catppuccinColors = Object.keys(mochaColors)
const mochaEntries = Object.entries(mochaColors)

function vsCodeThemeToShiki(json: string): ThemeRegistration | undefined {
	const replaceForeground = (text: string, toReplace: string, replacement: string) => {
		const regex = new RegExp(`"foreground": "${toReplace}"`, "g")
		return text.replaceAll(regex, `"foreground": "${replacement}"`)
	}

	console.log({ json })

	try {
		return pipe(
			json,
			(text) =>
				catppuccinColors.reduce(
					(replaced, current) =>
						replaceForeground(replaced, current, createRgbaVar(current as ColorName)),
					text
				),
			(text) =>
				mochaEntries.reduce(
					(replaced, [colorName, value]) =>
						replaceForeground(replaced, value, createRgbaVar(colorName as ColorName)),
					text
				),
			(text) =>
				({
					...JSON.parse(text),
					fg: createRgbaVar("text"),
					bg: createRgbaVar("background"),
					name: "theme"
				}) satisfies ThemeRegistration
		)
	} catch (error) {
		console.error(error)
		// TODO add toast once svelte-sonner is Svelte 5 ready
		return undefined
	}
}
