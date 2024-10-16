import { applyPatches, enablePatches, produceWithPatches, type Patch } from "immer"
import {
	filter,
	map,
	merge,
	Observable,
	of,
	pipe as rxpipe,
	share,
	switchMap,
	type MonoTypeOperatorFunction
} from "rxjs"

enablePatches()

type Patches = {
	patches: Patch[]
	inversePatches: Patch[]
}

type HistoryItem = {
	undone: Patches[]
	undoable: Patches[]
	previous: any
}

type History = Record<string, HistoryItem>

const history: History = {}
const toUndos: string[] = []

const undoRedo$ = new Observable<"undo" | "redo">((subscriber) => {
	if (typeof document === "undefined") return
	document.addEventListener("keydown", onKeydown)

	return () => document.removeEventListener("keydown", onKeydown)

	function onKeydown(event: KeyboardEvent) {
		if (event.key === "z" && event.ctrlKey) {
			console.log("undo")
			subscriber.next("undo")
		}
		if (event.key === "y" && event.ctrlKey) {
			console.log("redo")
			subscriber.next("redo")
		}
	}
}).pipe(share())

/** Add undo abillity to this stream, ez */
export function undo<T>(
	/** The name of the history item. Used to differ it from other undo streams */
	name: string,
	debounce: number = 150
): MonoTypeOperatorFunction<T> {
	history[name] ??= {
		undone: [],
		undoable: [],
		previous: undefined
	}

	return rxpipe(
		switchMap((data) => {
			history[name].undone = []
			toUndos.push(name)
			const previous = history[name].previous

			produceWithPatches(
				previous ?? {},
				(_draft) => data,
				(patches, inversePatches) => {
					history[name].undoable.push({ patches, inversePatches })
					history[name].previous = data
				}
			)

			console.log(history[name].undoable)

			const undoRedoData$ = undoRedo$.pipe(
				map((action) => {
					if (action === "undo") {
						const undo = history[name].undoable.pop()
						console.log("undo patches", undo)

						if (!undo) return

						history[name].undone.push(undo)

						const newData = applyPatches(previous ?? {}, undo.inversePatches)
						history[name].previous = newData
						console.log("undo data", newData)
						return newData
					}

					if (action === "redo") {
						const redo = history[name].undone.pop()

						if (!redo) return

						history[name].undoable.push(redo)

						const newData = applyPatches(previous ?? {}, redo.patches)
						history[name].previous = newData
						return newData
					}
				}),
				filter(Boolean)
			)

			return merge(of(data), undoRedoData$)
		})
	)
}
