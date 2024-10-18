import { compile } from "@catppuccin/vscode"
import { createRgbaVar } from "./utils"
import { createHighlighter, type ThemeRegistration } from "shiki"
import { languages } from "$lib/state/language"
import { mocha } from "./presets"
import type { ColorName } from "@catppuccin/palette"

const shiki = compile("mocha", {
	colorOverrides: {
		all: Object.fromEntries(
			Object.keys(mocha.colors).map((name_) => {
				return [name_, createRgbaVar(name_ as ColorName)]
			})
		)
	}
})

export const shikiTheme: ThemeRegistration = {
	...shiki,
	fg: createRgbaVar("text"),
	bg: createRgbaVar("background"),
	type: "dark",
	name: "theme",
	semanticTokenColors: {}
}

export const highlighter = await createHighlighter({
	themes: [shikiTheme],
	langs: [...Object.keys(languages), "json", "lua", "bash"]
})
