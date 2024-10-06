import { defineConfig, presetIcons, presetMini, transformerDirectives } from "unocss"
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

const baseAsRGBA = Object.entries(base16).map(([key, value]) => [
	key,
	chroma(value).rgb().join(",")
])

const shadcnVariables = [
	"background",
	"foreground",
	"muted",
	"muted-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"accent",
	"accent-foreground",
	"ring",
	"ring-foreground",
	"destructive",
	"destructive-foreground",
	"input",
	"input-foreground"
] as const

export default defineConfig({
	presets: [presetMini({ dark: "class" }), presetIcons()],
	shortcuts: [],
	transformers: [transformerDirectives()],
	theme: {
		colors: {
			...createBase16Classes(),
			neutral: {
				0: createRgbaVar("base0"),
				1: createRgbaVar("base1"),
				2: createRgbaVar("base2"),
				3: createRgbaVar("base3"),
				4: createRgbaVar("base4"),
				5: createRgbaVar("base5"),
				6: createRgbaVar("base6"),
				7: createRgbaVar("base7")
			},
			...createShadcnClasses()
		},
		screens: {
			"2xl": "1400px"
		}
	},
	preflights: [{ getCSS: createGlobalVariables, layer: "base" }],
	content: {
		pipeline: {
			include: [
				// the default
				/\.(svelte|[jt]sx|mdx?|html)($|\?)/,
				// include js/ts files
				"(components|src)/**/*.{js,ts}"
			]
		}
	}
})

function createGlobalVariables() {
	const base = baseAsRGBA.map(([key, value]) => `--${key}: ${value};`)
	const neutrals = {
		background: { light: cssVar("base6"), dark: cssVar("base0") },
		foreground: { light: cssVar("base1"), dark: cssVar("base6") },
		muted: { light: cssVar("base5"), dark: cssVar("base2") },
		"muted-foreground": { light: cssVar("base5"), dark: cssVar("base2") },
		primary: { light: cssVar("base1"), dark: cssVar("base6") },
		"primary-foreground": { light: cssVar("base6"), dark: cssVar("base2") },
		secondary: { light: cssVar("base1"), dark: cssVar("base1") },
		"secondary-foreground": { light: cssVar("base6"), dark: cssVar("base2") },
		accent: { light: cssVar("base5"), dark: cssVar("base2") },
		"accent-foreground": { light: cssVar("base3"), dark: cssVar("base5") },
		ring: { light: cssVar("base5"), dark: cssVar("base3") },
		"ring-foreground": { light: cssVar("base3"), dark: cssVar("base5") },
		destructive: { light: cssVar("baseF"), dark: cssVar("baseF") },
		"destructive-foreground": { light: cssVar("base0"), dark: cssVar("base0") },
		input: { light: cssVar("base2"), dark: cssVar("base3") },
		"input-foreground": { light: cssVar("base0"), dark: cssVar("base0") }
	} satisfies Record<(typeof shadcnVariables)[number], { light: string; dark: string }>

	const darks: string[] = []
	const root: string[] = [...base]

	for (const element of Object.entries(neutrals)) {
		const [key, { light, dark }] = element
		darks.push(`--${key}: ${dark};`)
		root.push(`--${key}: ${light};`)
	}

	return `@layer base {  
		:root { ${root.join("\n")} }
		.dark { ${darks.join("\n")} }
	}`
}

function createBase16Classes() {
	const vars = baseAsRGBA
		.map(([key]) => ({ [key]: `rgba(var(--${key}))` }))
		.reduce((acc, curr) => ({ ...acc, ...curr }), {})

	return vars
}

function createShadcnClasses() {
	return shadcnVariables
		.map((variable) => ({ [variable]: createRgbaVar(variable) }))
		.reduce((acc, curr) => ({ ...acc, ...curr }), {})
}

function cssVar(name: string) {
	return `var(--${name})`
}

function createRgbaVar(name: string) {
	return `rgba(${cssVar(name)})`
}
