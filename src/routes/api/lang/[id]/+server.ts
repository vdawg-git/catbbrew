import { languages, type LanguageName } from "$lib/state/language"
import type { RequestHandler } from "@sveltejs/kit"
import type { EntryGenerator } from "./$types"

export const GET: RequestHandler = async ({ fetch, params: { id } }) => {
	if (!id) return new Response("no lang specified")

	const fileName = languages[id as LanguageName]?.fileName

	if (!fileName) return new Response(`Language "${id}" not found`)

	return fetch(`/languages/${fileName}`)
		.then((res) => res.text())
		.then((text) => new Response(text))
}

export const entries = () => Object.keys(languages).map((language) => ({ id: language }))

export const prerender = true
