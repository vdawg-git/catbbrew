import type { ColorPaletteOkhsl } from "$lib/presets"
import { writable, type Writable } from "svelte/store"

export type Snapshot = {
	colors: ColorPaletteOkhsl
	timestamp: number
}

export const snapshots: Writable<readonly Snapshot[]> = writable([])
