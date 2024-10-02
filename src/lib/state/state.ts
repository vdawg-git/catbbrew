import { base16 } from "$lib/colors";
import { writable } from "svelte/store";

export const colors$ = writable( 
    base16
)