import { baseColors } from "$lib/colors"
import { derived, writable, type Readable } from "svelte/store"
import type { Color, ColorName } from "$lib/types"
import { formatHex, okhsl, rgb, type Okhsl } from "culori"
import * as R from "remeda"

export const colors$ = writable(
	Object.fromEntries(
		baseColors.map(([name, { value }]) => [name, okhsl(value)] as const)
	) as Record<ColorName, Okhsl>
)

const colorVars$ = derived(colors$, (colors) =>
	Object.entries(colors).map(([key, value]) => {
		const result = rgb(value)!

		const { r, g, b } = result
		const newValue = [r, g, b].map(R.multiply(255)) as [number, number, number]
		return [`--${key}`, `${newValue}`]
	})
)

if (globalThis.document) {
	colorVars$.subscribe((newVariables) => {
		newVariables.forEach(([key, value]) => {
			globalThis.document.documentElement.style.setProperty(key, value)
		})
	})
}

export const activeColor$ = writable<ColorName | undefined>(undefined)
export const activeColorHsl$: Readable<Okhsl | undefined> = derived(
	[activeColor$, colors$],
	([activeColor, colors]) => {
		if (!activeColor) return undefined

		return colors[activeColor]
	}
)
export const activeColorHex$ = derived(activeColorHsl$, (activeColor) => {
	if (!activeColor) return undefined

	const hex = formatHex(activeColor)
	return hex
})

export const activeColorRgb$ = derived(activeColorHex$, (activeColorValue) => {
	if (!activeColorValue) return undefined

	const result = rgb(activeColorValue)

	if (!result) return undefined
	const { r, g, b } = result
	return [r, g, b].map(R.multiply(255)) as [number, number, number]
})
