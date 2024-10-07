import type { Color } from "./types"

/**
 * The base colors of the palette taken from the Catppuccin color palette
 * @see https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md#color-palette
 */
export const baseColors: Color[] = [
	["rosewater", { value: "#f4dbd6", accent: true }],
	["flamingo", { value: "#f0c6c6", accent: true }],
	["pink", { value: "#f5bde6", accent: true }],
	["mauve", { value: "#c6a0f6", accent: true }],
	["red", { value: "#ed8796", accent: true }],
	["maroon", { value: "#ee99a0", accent: true }],
	["peach", { value: "#f5a97f", accent: true }],
	["yellow", { value: "#eed49f", accent: true }],
	["green", { value: "#a6da95", accent: true }],
	["teal", { value: "#8bd5ca", accent: true }],
	["sky", { value: "#91d7e3", accent: true }],
	["sapphire", { value: "#7dc4e4", accent: true }],
	["blue", { value: "#8aadf4", accent: true }],
	["lavender", { value: "#b7bdf8", accent: true }],
	["text", { value: "#cad3f5", accent: false }],
	["subtext1", { value: "#b8c0e0", accent: false }],
	["subtext0", { value: "#a5adcb", accent: false }],
	["overlay2", { value: "#939ab7", accent: false }],
	["overlay1", { value: "#8087a2", accent: false }],
	["overlay0", { value: "#6e738d", accent: false }],
	["surface2", { value: "#5b6078", accent: false }],
	["surface1", { value: "#494d64", accent: false }],
	["surface0", { value: "#363a4f", accent: false }],
	["base", { value: "#24273a", accent: false }],
	["mantle", { value: "#1e2030", accent: false }],
	["crust", { value: "#181926", accent: false }]
] as const

// export function createPaletteFromColor(
// 	/** This is the `500` middle color */
// 	color: string
// ): ColorPalette {
// 	const color50Lightness = 0.1
// 	const color50 = chroma(color).set("oklch.l", color50Lightness)
// 	const color950Lightness = 0.9
// 	const color950 = chroma(color).set("oklch.l", color950Lightness)
// 	const palette = chroma
// 		.scale([color50, color, color950])
// 		.mode("oklch")
// 		.colors(COLOR_STOPS.length)
// 		.reduce((acc, color, index) => {
// 			acc[COLOR_STOPS[index]] = color
// 			return acc
// 		}, {} as ColorPalette)

// 	return palette
// }
