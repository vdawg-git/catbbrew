import { baseColors } from "$lib/colors"
import { derived, writable } from "svelte/store"
import type { Color, ColorName } from "$lib/types"

export const colors$ = writable(
	Object.fromEntries(baseColors.map(([name, { value }]) => [name, value] as const)) as Record<
		ColorName,
		string
	>
)

export const activeColor$ = writable<ColorName | undefined>(undefined)
export const activeColorValue$ = derived([activeColor$, colors$], ([activeColor, colors]) => {
	if (!activeColor) return undefined

	return colors[activeColor]
})
