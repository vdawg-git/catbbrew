import { flavors, type CatppuccinFlavor, type ColorName } from "@catppuccin/palette"
import * as R from "remeda"
import { okhsl, type Okhsl } from "culori"

type ColorPreset = { name: string; colors: Record<ColorName, string> }

export const presets: ColorPreset[] = [...Object.values(flavors).map(convertPreset)]
export const mocha = presets.find((preset) => preset.name === "Mocha")!

function convertPreset(preset: CatppuccinFlavor): ColorPreset {
	return {
		name: preset.name,
		colors: Object.fromEntries(preset.colorEntries.map(([name_, value]) => [name_, value.hex]))
	} as ColorPreset
}

type ColorPaletteOkhsl = Record<ColorName, Okhsl>

export function presetToOkhsl(preset: ColorPreset): ColorPaletteOkhsl {
	return R.mapValues(preset.colors, (value) => okhsl(value) ?? okhsl("black")!)
}
