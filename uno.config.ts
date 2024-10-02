import { defineConfig, presetMini, transformerDirectives } from "unocss"
import chroma from "chroma-js"

const base16 = {
	base0: "#1a1b26",
	base1: "#24283b",
	base2: "#414868",
	base3: "#565f89",
	base4: "#9aa5ce",
	base5: "#c0caf5",
	base6: "#cfc9c2",
	base7: "#d5d6db",
	base8: "#f7768e",
	base9: "#ff9e64",
	baseA: "#e0af68",
	baseB: "#9ece6a",
	baseC: "#73daca",
	baseD: "#7aa2f7",
	baseE: "#bb9af7",
	baseF: "#db4b4b"
}

const baseAsRGB = Object.entries(base16).map(([key, value]) => [key, chroma(value).rgb().join(",")])

function createTheme() {
	const vars = baseAsRGB
		.map(([key]) => ({ [key]: `rgba(var(--${key}))` }))
		.reduce((acc, curr) => ({ ...acc, ...curr }), {})

	return vars
}

function createVar(name: string) {
	return `rgba(var(--${name}) )`
}

function createGlobalVariables() {
	const vars = baseAsRGB.map(([key, value]) => `--${key}: ${value};`).join("\n")

	return `:root {
		${vars}
	}`
}

export default defineConfig({
	presets: [presetMini({ dark: "class" })],
	shortcuts: [],
	transformers: [transformerDirectives()],
	theme: {
		colors: {
			...createTheme(),
			neutral: {
				0: createVar( "base0" ),
				1: createVar( "base1" ),
				2: createVar( "base2" ),
				3: createVar( "base3" ),
				4: createVar( "base4" ),
				5: createVar( "base5" ),
				6: createVar( "base6" ),
				7: createVar( "base7" ),
		}
	}},
	preflights: [
		{
			getCSS: createGlobalVariables
		}
	]
})
