import { writable, type Writable } from "svelte/store"

// light mode: 0
// dark mode: 1
export const mode: Writable<number> = writable(1)
export const toggle_popup: Writable<boolean> = writable(false);
export const current_folder_id: Writable<number> = writable(-1);
export const toggle_toast: Writable<boolean> = writable(false);

// sticky

