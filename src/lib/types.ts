import type { ColorName } from "@catppuccin/palette"
import type { shadcnVariables } from "./utils.ts"

export type ColorVariable =
	| ColorName
	| (typeof shadcnVariables)[number]
	| "active-color"
	| "active-colorForeground"

export type Identity<T = unknown> = (x: T) => T
