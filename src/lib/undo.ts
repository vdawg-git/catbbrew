import { applyPatches, enablePatches, nothing, produceWithPatches, type Patch } from "immer"
import {
	filter,
	map,
	merge,
	Observable,
	of,
	pairwise,
	pipe as rxpipe,
	share,
	startWith,
	switchMap,
	type MonoTypeOperatorFunction
} from "rxjs"

enablePatches()

type HistoryItem<T> = {
	undone: T[]
	undoable: T[]
}

type History<T> = Record<string, HistoryItem<T>>

const history: History<unknown> = {}
const toUndos: string[] = []
let toRedos: string[] = []

const undoRedo$ = new Observable<[action: "undo" | "redo", item: string]>((subscriber) => {
	if (typeof document === "undefined") return
	document.addEventListener("keydown", onKeydown)

	return () => document.removeEventListener("keydown", onKeydown)

	function onKeydown(event: KeyboardEvent) {
		if (event.key === "z" && event.ctrlKey) {
			console.log("undo")
			// not sure if this will work with multiple undo streams
			// right now this works with one, as when an undo is done,
			// a new value comes in which triggers a push to `toUndos` again
			const toUndo = toUndos.splice(-2, 2)[0]
			if (!toUndo) return
			toRedos.push(toUndo)
			subscriber.next(["undo", toUndo])
		}
		if (event.key === "y" && event.ctrlKey) {
			console.log("redo")
			const toRedo = toRedos.splice(-2, 2)[0]
			if (!toRedo) return
			toUndos.push(toRedo)
			subscriber.next(["redo", toRedo])
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
		undoable: []
	}
	let isFirstRun = true

	return rxpipe(
		switchMap((data) => {
			if (!isFirstRun) {
				history[name].undoable.push(data)
				history[name].undone = []
				toUndos.push(name)
				toRedos = toRedos.filter((item) => item !== name)
			}
			isFirstRun = false

			const undoRedoData$ = undoRedo$.pipe(
				filter(([, itemName]) => itemName === name),
				map(([action]) => {
					if (action === "undo") {
						// the latest undoable is the current state
						const undo = history[name].undoable.splice(-2, 2)[0] as T | undefined
						console.log("undo patches", undo)
						console.log("undos", toUndos)

						if (!undo) return

						history[name].undone.push(undo)

						return undo
					}

					if (action === "redo") {
						const redo = history[name].undone.pop() as T | undefined

						if (!redo) return

						history[name].undoable.push(redo)

						console.log("redo data", redo)
						return redo
					}
				}),
				filter(Boolean)
			)

			return merge(of(data), undoRedoData$)
		})
	)
}
