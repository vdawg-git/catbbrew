<script lang="ts" context="module">
</script>

<script lang="ts">
	import { produce } from "immer"
	import { activeColor$, activeColorHex$, activeColorHsl$, colors$ } from "$lib/state/state"
	import {
		distinctUntilChanged,
		combineLatest,
		filter,
		map,
		Subject,
		throttleTime,
		tap,
		share,
		startWith
	} from "rxjs"
	import * as R from "remeda"
	import { formatHex, hsl, okhsl, round, samples, type Okhsl } from "culori"
	import { derived, type Readable } from "svelte/store"

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
	const hueBackground = derived(activeColorHsl$ as Readable<Okhsl>, ({ l, s }) =>
		samples(64)
			.map((h) => formatHex(okhsl(`color(--okhsl ${h * 360} ${s ?? 1} ${l ?? 0.8})`)))
			.join(", ")
	)
	const saturationBackground = derived(activeColorHsl$ as Readable<Okhsl>, ({ h }) =>
		samples(64)
			.map((s) => formatHex(okhsl(`color(--okhsl ${h ?? 180} ${s ?? 1} 0.5)`)))
			.join(", ")
	)
	const lightnessBackground = samples(64)
		.map((l) => formatHex(okhsl(`color(--okhsl 0 0 ${l})`)))
		.join(", ")

	const output$ = input$$.pipe(throttleTime(15))

	output$.subscribe((current) => {
		if (!$activeColor$) {
			console.warn("no active color hgoj")
			return
		}
		colors$.update(
			produce((colors) => {
				colors[$activeColor$!] = { ...colors[$activeColor$!], ...current }
			})
		)
	})
</script>

<div class="bg-background">
	Input: {JSON.stringify($input$$ ?? undefined)} <br />
</div>

<div
	class="bg-surface0 px6 py3 ani items-center gap8 outline shadow-base shadow outline-activeColor rounded-3xl min-w-max w-max flex"
>
	{#if $activeColorHsl$}
		<div class="flex flex-col gap-5">
			<div class="flex gap6 flex-col items-center">
				<div class="flex gap6">
					<button
						class="bg-activeColor min-w-22 font-mono text-center text-activeColorForeground rounded-lg outline-activeColor px2 py1"
					>
						<div class="">
							{$activeColor$}
						</div>
						<div class="">
							{$activeColorHex$}
						</div>
					</button>
					<div class="flex flex-col gap-3">
						{@render control(1, 0.01, $saturationBackground, s$, $activeColorHsl$.s)}
						{@render control(1, 0.01, lightnessBackground, l$, $activeColorHsl$.l)}
					</div>
				</div>
			</div>
			{@render control(360, 1, $hueBackground, h$, Math.round($activeColorHsl$.h ?? 0), "28rem")}
		</div>
	{/if}
</div>

{#snippet control(
	max: number,
	step: number,
	background: string,
	input: Subject<number | undefined>,
	value: number,
	width: string = "15rem"
)}
	<div class="flex items-center gap-2">
		<input
			type="number"
			{value}
			min={0}
			{step}
			{max}
			on:input={({ currentTarget: { value } }) => {
				const number = Number(value)
				if (Number.isNaN(number) || number < 0 || number > max) return
				input.next(number)
			}}
			class="w-[8ch] px2 text-sm rounded text-background outline-overlay0 py1 bg-subtext1 placeholder-foreground text-center"
		/>
		<input
			type="range"
			min={0}
			on:input={({ currentTarget: { value: string } }) => {
				const value = Number(string)
				// if (value === $input) return
				input.next(value)
			}}
			{step}
			{max}
			{value}
			style:width
			style="--slider-bg: linear-gradient(to right, {background});"
		/>
	</div>
{/snippet}

<style>
	@keyframes inn {
		from {
			translate: 0 100%;
			scale: 0.8;
			visibility: visible;
		}
		to {
			translate: 0 0%;
			scale: 1;
		}
	}

	.ani {
		animation: inn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/*********** Baseline, reset styles ***********/
	input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
	}

	/* Removes default focus */
	input[type="range"]:focus {
		outline: none;
	}

	/******** Chrome, Safari, Opera and Edge Chromium styles ********/
	/* slider track */
	input[type="range"]::-webkit-slider-runnable-track {
		background: var(--slider-bg);
		border-radius: 21.5rem;
		height: 1.5rem;
	}

	/* slider thumb */
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: 0px; /* Centers thumb on the track */
		background-color: theme("colors.subtext1");
		border-radius: 26rem;
		height: 1.5rem;
		width: 1.5rem;
	}

	input[type="range"]:focus::-webkit-slider-thumb {
		outline: 3px solid theme("colors.subtext1");
		outline-offset: 0.125rem;
	}

	/*********** Firefox styles ***********/
	/* slider track */
	input[type="range"]::-moz-range-track {
		background: var(--slider-bg);
		border-radius: 21.5rem;
		height: 1.5rem;
	}

	/* slider thumb */
	input[type="range"]::-moz-range-thumb {
		background-color: theme("colors.subtext1");
		border: none; /*Removes extra border that FF applies*/
		border-radius: 99rem;
		height: 1.5rem;
		width: 1.5rem;
	}

	input[type="range"]:focus::-moz-range-thumb {
		outline: 3px solid theme("colors.subtext1");
		outline-offset: 0.125rem;
	}
</style>
