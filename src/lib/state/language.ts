import { writable } from "svelte/store"

import Rust from "$lib/icons/rust.svelte"
import Typescript from "$lib/icons/typescript.svelte"
import type { Component } from "svelte"
import Go from "$lib/icons/go.svelte"
import Bash from "$lib/icons/bash.svelte"
import Javascript from "$lib/icons/javascript.svelte"
import Python from "$lib/icons/python.svelte"
import Cpp from "$lib/icons/cpp.svelte"
import { storeToObservable } from "$lib/utils"
import { map, shareReplay, type Observable } from "rxjs"

type Language = {
	display: string
	fileName: string
	icon: Component
}

export const languages = {
	typescript: {
		display: "Typescript",
		icon: Typescript,
		fileName: "typescript.txt"
	},
	rust: {
		display: "Rust",
		icon: Rust,
		fileName: "rust.txt"
	},
	go: {
		display: "Go",
		icon: Go,
		fileName: "go.txt"
	},
	bash: {
		display: "Bash",
		icon: Bash,
		fileName: "bash.txt"
	},
	js: {
		display: "Javascript",
		icon: Javascript,
		fileName: "js.txt"
	},
	python: {
		display: "Python",
		icon: Python,
		fileName: "python.txt"
	},
	cpp: {
		display: "C++",
		icon: Cpp,
		fileName: "cpp.txt"
	}
} as const satisfies Record<string, Language>

export type LanguageName = keyof typeof languages

const state = writable<LanguageName>("typescript")
export const setLanguage = state.set
export const language$: Observable<(Language & { name: string }) | undefined> = storeToObservable(
	state
).pipe(
	map((name) => ({ ...languages[name], name })),
	shareReplay({ bufferSize: 1, refCount: true })
)
