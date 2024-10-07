import { baseColors } from "$lib/colors"
import { writable } from "svelte/store"
import type { ColorName } from "$lib/types"

export const colors$ = writable(
	Object.fromEntries(baseColors.map(([name, { value }]) => [name, value] as const)) as Record<
		ColorName,
		string
	>
)
