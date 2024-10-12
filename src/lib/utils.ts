import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cubicOut } from "svelte/easing"
import type { TransitionConfig } from "svelte/transition"
import type { ColorVariable } from "./types"
import { Observable, share } from "rxjs"
import type { Writable } from "svelte/store"
import type { Readable } from "svelte/motion"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
	y?: number
	x?: number
	start?: number
	duration?: number
}

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node)
	const transform = style.transform === "none" ? "" : style.transform

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA
		const [minB, maxB] = scaleB

		const percentage = (valueA - minA) / (maxA - minA)
		const valueB = percentage * (maxB - minB) + minB

		return valueB
	}

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str
			return str + `${key}:${style[key]};`
		}, "")
	}

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			})
		},
		easing: cubicOut
	}
}

export const shadcnVariables = [
	"background",
	"popover",
	"card",
	"muted-foreground",
	"card-foreground",
	"foreground",
	"popover-foreground",
	"primary",
	"secondary-foreground",
	"accent-foreground",
	"destructive-foreground",
	"border",
	"input",
	"accent",
	"muted",
	"secondary",
	"primary-foreground",
	"destructive",
	"ring"
] as const

export function cssVar(name: ColorVariable) {
	return `var(--${name})`
}

export function createRgbaVar(name: ColorVariable) {
	return `rgba(${cssVar(name)})`
}

/**
 * Convert a Svelte store to an Rxjs observable
 * @param store The Svelte store to convert to an obserable
 */
export function fromStore<T>(store: Writable<T> | Readable<T>): Observable<T> {
	return new Observable((subscriber) => {
		const unsubscribe = store.subscribe((value) => subscriber.next(value))

		return unsubscribe
	}).pipe(
		// @ts-expect-error
		share()
	)
}

export function copyToClipboard(text: string) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// toast.success(`Copied: ${text}`, { closable: true })
		})
		.catch((err) => {
			console.error(err)
			// toast.error("Failed to copy to clipboard.", { closable: true })
		})
}
