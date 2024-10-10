import type { shadcnVariables } from "./utils.ts"

export type ColorName =
	| "rosewater"
	| "flamingo"
	| "pink"
	| "mauve"
	| "red"
	| "maroon"
	| "peach"
	| "yellow"
	| "green"
	| "teal"
	| "sky"
	| "sapphire"
	| "blue"
	| "lavender"
	| "text"
	| "subtext1"
	| "subtext0"
	| "overlay2"
	| "overlay1"
	| "overlay0"
	| "surface2"
	| "surface1"
	| "surface0"
	| "base"
	| "mantle"
	| "crust"

export type Color = [ColorName, { value: string; accent: boolean }]

export type ColorVariable =
	| ColorName
	| (typeof shadcnVariables)[number]
	| "active-color"
	| "active-color-foreground"

export type Identity<T = unknown> = (x: T) => T
