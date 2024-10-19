import type { ColorPaletteOkhsl } from "$lib/presets"
import { derived, writable, type Readable, type Writable } from "svelte/store"
import { setColors } from "./colors"

type Snapshot = {
	name?: string
	colors: ColorPaletteOkhsl
	timestamp: string
}

export const snapshots: Writable<Record<string, Snapshot>> = writable({})
export const activeSnapshotId: Writable<string | undefined> = writable(undefined)
export const activeSnapshot: Readable<Snapshot | undefined> = derived(
	[activeSnapshotId, snapshots],
	([id, data]) => (id && id !== "" ? data[id] : undefined)
)

activeSnapshot.subscribe((snapshot) => {
	if (!snapshot) return

	setColors(snapshot.colors)
})
