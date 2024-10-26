import { writable } from "svelte/store"
import { formatHex, rgb, type Okhsl } from "culori"
import * as R from "remeda"
import { fromStore } from "$lib/utils"
import { undo } from "$lib/undo"
import {
	BehaviorSubject,
	combineLatest,
	debounceTime,
	map,
	sampleTime,
	shareReplay,
	skip,
	type Observable
} from "rxjs"
import type { ColorName } from "@catppuccin/palette"
import { mocha, presetToOkhsl } from "$lib/presets"

export const colorsInput$ = new BehaviorSubject(presetToOkhsl(mocha))

export const colors$ = colorsInput$.pipe(undo("colors", 222), shareReplay(1))

const colorVars$ = colors$.pipe(
	map((colors) =>
		Object.entries(colors).map(([key, value]) => {
			const result = rgb(value)!
			if (!result) {
				console.error(`Invalid color`, value)
			}

			const { r, g, b } = result
			const newValue = [r, g, b]
				// if the lightness is 0 then rgb will give NaN values
				.map((value) => (Number.isNaN(value) ? 0 : value))
				.map(R.multiply(255)) as [number, number, number]
			return [`--${key}`, `${newValue}`]
		})
	)
)

export const restoreAvailable = !!globalThis.localStorage && !!localStorage.getItem("colors")

// Runs in the browser
if (globalThis.document) {
	colors$.pipe(skip(2), debounceTime(2500)).subscribe((colors) => {
		localStorage.setItem("colors", JSON.stringify(colors))
	})

	// We throttle elegantly
	// as otherwise we get lags when dragging color adjustment sliders
	colorVars$.pipe(sampleTime(50)).subscribe((newVariables) => {
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
