import { flavors, type CatppuccinFlavor, type ColorName } from "@catppuccin/palette"
import * as R from "remeda"
import { okhsl, type Okhsl } from "culori"

type ColorPreset = {
	name: string
	colors: Record<ColorName, string>
	author: { name: string; url?: string }
}

function convertPreset(preset: CatppuccinFlavor): ColorPreset {
	return {
		name: preset.name,
		author: { name: "Catppuccin" },
		colors: Object.fromEntries(preset.colorEntries.map(([name_, value]) => [name_, value.hex]))
	} as ColorPreset
}

export type ColorPaletteOkhsl = Record<ColorName, Okhsl>

export function presetToOkhsl(preset: ColorPreset): ColorPaletteOkhsl {
	return R.mapValues(preset.colors, (value) => okhsl(value) ?? okhsl("black")!)
}

/* const ayu: ColorPreset = {
	name: "Ayune",
	author: {
		name: "Pete Kazmier",
		url: "https://github.com/pkazmier"
	},
	colors: {
		rosewater: "#F5B8AB",
		flamingo: "#F29D9D",
		pink: "#AD6FF7",
		mauve: "#FF8F40",
		red: "#E66767",
		maroon: "#EB788B",
		peach: "#FAB770",
		yellow: "#FACA64",
		green: "#70CF67",
		teal: "#4CD4BD",
		sky: "#61BDFF",
		sapphire: "#4BA8FA",
		blue: "#00BFFF",
		lavender: "#00BBCC",
		text: "#C1C9E6",
		subtext1: "#A3AAC2",
		subtext0: "#8E94AB",
		overlay2: "#7D8296",
		overlay1: "#676B80",
		overlay0: "#464957",
		surface2: "#3A3D4A",
		surface1: "#2F313D",
		surface0: "#1D1E29",
		base: "#0b0b12",
		mantle: "#11111a",
		crust: "#191926"
	}
} */

export const presets: ColorPreset[] = [...Object.values(flavors).map(convertPreset)]
export const mocha = presets.find((preset) => preset.name === "Mocha")!
