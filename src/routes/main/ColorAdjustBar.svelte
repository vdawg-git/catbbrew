<script lang="ts">
	import Slider from "$lib/components/ui/slider/slider.svelte"
	import { produce } from "immer"
	import { activeColor$, activeColorHex$, activeColorHsl$, colors$ } from "$lib/state/state"
	import {
		BehaviorSubject,
		distinctUntilChanged,
		combineLatest,
		filter,
		map,
		merge,
		Subject,
		debounceTime,
		throttleTime,
		scan,
		tap,
		share,
		startWith
	} from "rxjs"
	import * as R from "remeda"
	import { fromStore } from "$lib/utils"
	import { derived, writable } from "svelte/store"
	import { converter, formatHex, modeOkhsl, type Color } from "culori"
	import type { Identity } from "$lib/types"

	const active$ = fromStore(activeColorHsl$)

	type HSL = { h: number; s: number; l: number }
	// const input$ = writable<Partial<HSL>>({})
	const h$ = new Subject<number | undefined>()
	const s$ = new Subject<number | undefined>()
	const l$ = new Subject<number | undefined>()
	activeColor$.subscribe(() => {
		h$.next(undefined)
		s$.next(undefined)
		l$.next(undefined)
	})

	const input$ = combineLatest([
		h$.pipe(startWith(undefined), distinctUntilChanged()),
		s$.pipe(startWith(undefined), distinctUntilChanged()),
		l$.pipe(startWith(undefined), distinctUntilChanged())
	]).pipe(
		map(([h, s, l]) => ({ h, s, l })),
		map(R.omitBy(R.anyPass([R.isNullish, Number.isNaN]))),
		tap(console.log),
		distinctUntilChanged(
			(previous, current) => JSON.stringify(previous) === JSON.stringify(current)
		),
		share()
	)

	const input$$ = input$.pipe(
		// map((inputs) => {
		// 	const { h, s, l } = inputs
		// 	if (h === undefined || s === undefined || l === undefined) return undefined
		// 	return {
		// 		h,
		// 		s,
		// 		l,
		// 		mode: "okhsl"
		// 	}
		// }),
		filter(R.isDefined)
	)

	const output$ = input$$.pipe(throttleTime(15))

	// filter(({ original, color }) => !R.isDeepEqual(original, color)),
	// map(({ color }) => color)

	// const active$ = fromStore(activeColorOkHsl$).pipe(filter(R.isDefined))
	// const inputHue$ = new BehaviorSubject<number | undefined>(undefined)
	// const inputSaturation$ = new BehaviorSubject<number | undefined>(undefined)
	// const inputLightness$ = new BehaviorSubject<number | undefined>(undefined)

	// const inputs$ = combineLatest([inputHue$, inputSaturation$, inputLightness$]).pipe(
	// 	map(([h, s, l]) => {
	// 		return {
	// 			...(h && { h }),
	// 			...(s && { s }),
	// 			...(l && { l })
	// 		}
	// 	})
	// )

	// const output$ = combineLatest([active$, inputs$]).pipe(
	// 	map(([active, inputs]) => {
	// 		return {
	// 			...active,
	// 			...inputs
	// 		}
	// 	})
	// )

	output$.subscribe((current) => {
		if (!$activeColor$) {
			console.warn("no active color hgoj")
			return
		}

		// const active = { ...$colors$[$activeColor$] }

		// TODO colors in state need to get saved as okhsl, otherwise they loose data when converted to hex (aint no hue with no saturation)
		colors$.update(
			produce((colors) => {
				colors[$activeColor$!] = { ...colors[$activeColor$!], ...current }
			})
		)
		console.log($colors$[$activeColor$!])
	})
</script>

<div class="bg-background">
	Input: {JSON.stringify($input$$ ?? undefined)} <br />
</div>
<div
	class="bg-surface1 mb4 px6 py3 items-center gap3 outline shadow-base shadow outline-activeColor rounded-3xl min-w-max w-max flex"
>
	<div
		class="bg-activeColor min-w-22 font-mono text-center text-activeColorForeground rounded-lg outline-activeColor px2 py1"
	>
		{$activeColor$}
		{$activeColorHex$}
	</div>

	{#if $activeColorHsl$}
		<div class="bg-crust flex gap-2 p5">
			<input
				type="range"
				min={0}
				on:input={({ currentTarget: { value: string } }) => {
					const value = Number(string)
					if (value === $h$) return
					h$.next(value)
				}}
				step={1}
				max={360}
				value={[$activeColorHsl$?.h ?? 0]}
				class="w-40"
			/>
			<input
				type="range"
				on:input={({ currentTarget: { value: string } }) => {
					const value = Number(string)
					if (value === $s$) return
					s$.next(value)
				}}
				min={0}
				step={0.01}
				max={1}
				value={[$activeColorHsl$.s]}
				class="w-40"
			/>
			<input
				type="range"
				on:input={({ currentTarget: { value: string } }) => {
					const value = Number(string)
					if (value === $l$) return
					l$.next(value)
				}}
				min={0}
				step={0.01}
				max={1}
				value={[$activeColorHsl$.l]}
				class="w-40"
			/>
		</div>
	{/if}
</div>
