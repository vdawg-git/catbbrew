<script lang="ts">
	import { produce } from "immer"
	import { activeColor, activeColorHex$, activeColorHsl$, updateColors } from "$lib/state/colors"
	import {
		distinctUntilChanged,
		combineLatest,
		filter,
		map,
		Subject,
		throttleTime,
		share,
		startWith
	} from "rxjs"
	import * as R from "remeda"
	import { formatHex, okhsl, parse, samples, converter } from "culori"
	import { copyToClipboard } from "$lib/utils"

	const toOkhsl = converter("okhsl")

	// const input$ = writable<Partial<HSL>>({})
	const h$ = new Subject<number | undefined>()
	const s$ = new Subject<number | undefined>()
	const l$ = new Subject<number | undefined>()
	activeColor.subscribe(() => {
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

	const input$$ = input$.pipe(filter(R.isDefined))
	const hueBackground = activeColorHsl$.pipe(
		map((hsl) =>
			hsl
				? samples(64)
						.map((h) => formatHex(okhsl(`color(--okhsl ${h * 360} ${hsl.s ?? 1} ${hsl.l ?? 0.8})`)))
						.join(", ")
				: undefined
		)
	)

	const saturationBackground = activeColorHsl$.pipe(
		map((hsl) =>
			hsl
				? samples(64)
						.map((s) => formatHex(okhsl(`color(--okhsl ${hsl.h ?? 180} ${s ?? 1} 0.5)`)))
						.join(", ")
				: undefined
		)
	)

	const lightnessBackground = samples(64)
		.map((l) => formatHex(okhsl(`color(--okhsl 0 0 ${l})`)))
		.join(", ")

	const output$ = input$$.pipe(throttleTime(15))

	output$.subscribe((current) => {
		if (!$activeColor) {
			console.warn("no active color hgoj")
			return
		}
		updateColors(
			produce((colors) => {
				colors[$activeColor!] = { ...colors[$activeColor!], ...current }
			})
		)
	})
</script>

<div
	class="bg-surface0 ani items-center gap8 outline shadow-base shadow outline-border rounded-3xl min-w-max w-max flex"
>
	{#if $activeColorHsl$}
		<div class="flex gap-5">
			<div class="grid ml-3 grid-cols-2 items-center group">
				<input
					class="h18 rounded-xl grid-row-start-1 grid-row-end-2 grid-col-end-1 grid-col-end-3 grid-col-start-1 w-full flex"
					type="color"
					value={$activeColorHex$}
					on:input={({ currentTarget }) => {
						const ok = okhsl(currentTarget.value)
						if (!ok) return
						const { h, s, l } = ok
						h$.next(h)
						s$.next(s)
						l$.next(l)
					}}
				/>
				<div
					class="transition-opacity opacity-80 grid-col-start-2 z-1 grid-row-start-1 grid-row-end-2 grid-col-end-3 right-0 top-0 pointer-events-none flex justify-center items-center"
				>
					<div class="i-mingcute-color-picker-line text-activeColorForeground size-8"></div>
				</div>

				<div
					class="flex-col grid-row-start-1 grid-row-end-2 grid-col-start-1 grid-col-end-2 pointer-events-none items-center justify-center h17 font-mono text-center text-activeColorForeground rounded-r-lg outline-activeColor px2 py1 text-sm"
				>
					<button
						class="block grow hover:bg-background/20 rounded pointer-events-auto"
						on:click={() => $activeColor && copyToClipboard($activeColor)}
					>
						{$activeColor}
					</button>
					<input
						type="text"
						class="block max-w-8ch bg-transparent grow hover:outline-background/20 rounded cursor-text pointer-events-auto"
						value={$activeColorHex$}
						on:input={({ currentTarget: { value } }) => {
							const ok = toOkhsl(value)
							if (!ok) return
							const { h, s, l } = ok
							h$.next(h)
							s$.next(s)
							l$.next(l)
						}}
					/>
					<button
						class="block grow hover:bg-background/20 rounded pointer-events-auto"
						on:click={() => $activeColorHex$ && copyToClipboard($activeColorHex$)}
						aria-label="Copy to clipboard"
					>
						<div class="i-mingcute-copy-3-line size-5"></div>
					</button>
				</div>
			</div>
			<div class="flex flex-col gap-3 py3 pr-3">
				<div class="flex gap-3">
					{@render control(1, 0.005, $saturationBackground ?? "", s$, $activeColorHsl$.s)}
					{@render control(1, 0.005, lightnessBackground, l$, $activeColorHsl$.l)}
				</div>
				{@render control(
					360,
					1,
					$hueBackground ?? "",
					h$,
					Math.round($activeColorHsl$.h ?? 0),
					"28rem"
				)}
			</div>
		</div>
	{/if}
</div>

{#snippet control(
	max: number,
	step: number,
	background: string,
	input: Subject<number | undefined>,
	value: number,
	width: string = "10rem"
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
			class="w-[8ch] px2 text-sm rounded text-background outline-overlay1 py1 bg-overlay2 placeholder-foreground text-center"
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
		background-color: theme("colors.background");
		border-radius: 26rem;
		height: 1.5rem;
		width: 1.5rem;
		border: 2px solid theme("colors.foreground");
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
		border: 2px solid theme("colors.background");
		border-radius: 99rem;
		height: 1.5rem;
		width: 1.5rem;
	}

	input[type="range"]:focus::-moz-range-thumb {
		outline: 3px solid theme("colors.subtext1");
		outline-offset: 0.125rem;
	}

	input[type="color"] {
		-webkit-appearance: none;
		appearance: none;
		background-color: transparent;
		border: none !important;
		cursor: pointer;
		outline: none;
	}
	input[type="color"]::-webkit-color-swatch-wrapper {
		padding: 0;
	}
	input[type="color"]::-webkit-color-swatch {
		border: none;
	}
	input[type="color"]::-moz-color-swatch {
		border: none;
	}
</style>
