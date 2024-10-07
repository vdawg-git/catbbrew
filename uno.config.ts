import { defineConfig, presetIcons, presetMini, transformerDirectives } from "unocss"
import { baseColors } from "./src/lib/colors"
import { ColorName } from "./src/lib/types"
import chroma from "chroma-js"

const baseAsRGBA = baseColors.map(
	([key, { value }]) => [key, chroma(value).rgb().join(",")] as const
)

const shadcnVariables = [
	"background",
	"popover",
	"card",
	"muted-foreground",
	"card-foreground",
	"foreground",
	"popover-foreground",
	"primary",
	"secondary-foreground",
	"accent-foreground",
	"destructive-foreground",
	"border",
	"input",
	"accent",
	"muted",
	"secondary",
	"primary-foreground",
	"destructive",
	"ring"
] as const

export default defineConfig({
	presets: [presetMini({ dark: "class" }), presetIcons()],
	shortcuts: [],
	transformers: [transformerDirectives()],
	theme: {
		colors: {
			...createBase16Classes(),
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
		background: cssVar("base"),
		popover: cssVar("base"),
		card: cssVar("base"),

		"muted-foreground": cssVar("overlay2"),

		"card-foreground": cssVar("text"),
		foreground: cssVar("text"),
		"popover-foreground": cssVar("text"),
		primary: cssVar("text"),
		"secondary-foreground": cssVar("text"),
		"accent-foreground": cssVar("text"),
		"destructive-foreground": cssVar("text"),

		border: cssVar("surface1"),
		input: cssVar("surface2"),
		accent: cssVar("surface0"),
		muted: cssVar("surface0"),
		secondary: cssVar("surface0"),

		"primary-foreground": cssVar("mantle"),
		destructive: cssVar("red"),
		ring: cssVar("subtext1")
	} satisfies Record<(typeof shadcnVariables)[number], string>

	const root: string[] = [...base]

	for (const element of Object.entries(neutrals)) {
		const [key, value] = element
		root.push(`--${key}: ${value};`)
	}

	return `@layer base {  
		:root { ${root.join("\n")} }
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

function cssVar(name: ColorName | (typeof shadcnVariables)[number]) {
	return `var(--${name})`
}

function createRgbaVar(name: ColorName | (typeof shadcnVariables)[number]) {
	return `rgba(${cssVar(name)})`
}
