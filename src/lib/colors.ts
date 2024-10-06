import chroma, { type Color } from "chroma-js"

export const base16 = {
	base0: "#1a1b26",
	base1: "#24283b",
	base2: "#414868",
	base3: "#565f89",
	base4: "#9aa5ce",
	base5: "#c0caf5",
	base6: "#c4c6cf",
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

/**  The number of colors in the palette */
const STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

type ColorPalette = Record<(typeof STOPS)[number], Color>

export function createPaletteFromColor(
	/** This is the `500` middle color */
	color: string
): ColorPalette {
	const color50Lightness = 0.1
	const color50 = chroma(color).set("oklch.l", color50Lightness)
	const color950Lightness = 0.9
	const color950 = chroma(color).set("oklch.l", color950Lightness)
	const palette = chroma
		.scale([color50, color, color950])
		.mode("oklch")
		.colors(STOPS.length)
		.reduce((acc, color, index) => {
			acc[STOPS[index]] = chroma.hex(color)
			return acc
		}, {} as ColorPalette)

	return palette
}
