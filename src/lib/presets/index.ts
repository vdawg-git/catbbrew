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
	return R.mapValues(preset.colors, (value: string) => okhsl(value) ?? okhsl("black")!)
}

export const presets: ColorPreset[] = [...Object.values(flavors).map(convertPreset)]
export const mocha = presets.find((preset) => preset.name === "Mocha")!
