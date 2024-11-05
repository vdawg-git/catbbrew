import type { ColorPaletteOkhsl } from "$lib/presets"
import { formatHex } from "culori"
import * as R from "remeda"

export type Snippet = {
	code: (colors: ColorPaletteOkhsl) => string
	language: string
}

export const vsCode: Snippet = {
	code: (colors) =>
		`"catppuccin.colorOverrides": {\n\t"all": ${JSON.stringify(R.mapValues(colors, formatHex), null, 8)},\n},`,
	language: "json"
}

export const vim: Snippet = {
	code: (colors) =>
		`color_overrides = {
  all = {
${Object.entries(colors)
	.map(([color, value]) => `    ${color} = "${formatHex(value)}",`)
	.join("\n")}
  },
},`,
	language: "lua"
}

export const bash: Snippet = {
	code: (colors) =>
		Object.entries(colors)
			.map(([key, value]) => `${key}="${formatHex(value)}"`)
			.join("\n"),
	language: "bash"
}

export const base16: Snippet = {
	code: (colors) => `base00: "${formatHex(colors.base)}" # base
base01: "${formatHex(colors.mantle)}" # mantle
base02: "${formatHex(colors.surface0)}" # surface0
base03: "${formatHex(colors.surface1)}" # surface1
base04: "${formatHex(colors.surface2)}" # surface2
base05: "${formatHex(colors.text)}" # text
base06: "${formatHex(colors.rosewater)}" # rosewater
base07: "${formatHex(colors.lavender)}" # lavender
base08: "${formatHex(colors.red)}" # red
base09: "${formatHex(colors.peach)}" # peach
base0A: "${formatHex(colors.yellow)}" # yellow
base0B: "${formatHex(colors.green)}" # green
base0C: "${formatHex(colors.teal)}" # teal
base0D: "${formatHex(colors.blue)}" # blue
base0E: "${formatHex(colors.mauve)}" # mauve
base0F: "${formatHex(colors.flamingo)}" # flamingo`,
	language: "bash"
}
