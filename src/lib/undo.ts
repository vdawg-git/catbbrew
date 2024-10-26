import {
	debounceTime,
	filter,
	map,
	merge,
	Observable,
	pipe as rxpipe,
	share,
	shareReplay,
	tap,
	type MonoTypeOperatorFunction
} from "rxjs"

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
			// not sure if this will work with multiple undo streams
			// right now this works with one, as when an undo is done,
			// a new value comes in which triggers a push to `toUndos` again
			const toUndo = toUndos.pop()
			console.log("undo", { toUndo, toUndos })
			if (!toUndo) return
			toRedos.push(toUndo)
			subscriber.next(["undo", toUndo])
		}
		if (event.key === "y" && event.ctrlKey) {
			const toRedo = toRedos.pop()
			console.log("redo", { toRedo, toRedos })
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
	debounce: number = 180
): MonoTypeOperatorFunction<T> {
	history[name] ??= {
		undone: [],
		undoable: []
	}
	let isFirstRun = true

	return rxpipe((data$) => {
		const shared$ = data$.pipe(shareReplay({ bufferSize: 1, refCount: true }))

		const sideEffect$ = shared$.pipe(
			debounceTime(debounce),
			tap((debounced) => {
				history[name].undoable.push(debounced)
				history[name].undone = []

				console.log("added undo for:", name, history[name])

				if (!isFirstRun) {
					toUndos.push(name)
					toRedos = toRedos.filter((item) => item !== name)
				}

				isFirstRun = false
			}),
			filter(() => false)
		)

		const undoRedoData$ = undoRedo$.pipe(
			filter(([, itemName]) => itemName === name),
			map(([action]) => {
				if (action === "undo") {
					// the latest undoable is the current state
					const current = history[name].undoable.pop()
					if (!current) return
					const undo = history[name].undoable.at(-1) as T | undefined
					if (!undo) return

					console.log("trigger", { undo, toUndos })

					history[name].undone.push(current)

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

		return merge(shared$, undoRedoData$, sideEffect$)
	})
}
