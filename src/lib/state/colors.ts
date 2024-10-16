import { writable } from "svelte/store"
import { formatHex, okhsl, rgb, type Okhsl } from "culori"
import * as R from "remeda"
import { fromStore } from "$lib/utils"
import { undo } from "$lib/undo"
import { combineLatest, map, shareReplay, type Observable } from "rxjs"
import type { ColorName } from "@catppuccin/palette"
import { mocha, presetToOkhsl } from "$lib/presets"

const colors = writable(presetToOkhsl(mocha))

export const updateColors = colors.update
export const setColors = colors.set

export const colors$ = fromStore(colors).pipe(undo("colors"), shareReplay(1))

const colorVars$ = colors$.pipe(
	map((colors) =>
		Object.entries(colors).map(([key, value]) => {
			const result = rgb(value)!

			const { r, g, b } = result
			const newValue = [r, g, b].map(R.multiply(255)) as [number, number, number]
			return [`--${key}`, `${newValue}`]
		})
	)
)

if (globalThis.document) {
	colorVars$.subscribe((newVariables) => {
		newVariables.forEach(([key, value]) => {
			globalThis.document.documentElement.style.setProperty(key, value)
		})
	})
}

export const activeColor = writable<ColorName | undefined>(undefined)
const activeColor$ = fromStore(activeColor)
export const activeColorHsl$: Observable<Okhsl | undefined> = combineLatest([
	activeColor$,
	colors$
]).pipe(
	map(([activeColor, colors]) => {
		if (!activeColor) return undefined

		return colors[activeColor]
	}),
	shareReplay(1)
)

export const activeColorHex$ = activeColorHsl$.pipe(
	map((activeColor) => {
		if (!activeColor) return undefined

		const hex = formatHex(activeColor)
		return hex
	})
)

export const activeColorRgb$ = activeColorHex$.pipe(
	map((activeColorValue) => {
		if (!activeColorValue) return undefined

		const result = rgb(activeColorValue)

		if (!result) return undefined
		const { r, g, b } = result
		return [r, g, b].map(R.multiply(255)) as [number, number, number]
	})
)
