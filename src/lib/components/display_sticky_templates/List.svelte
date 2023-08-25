<script lang="ts">
	import { mode } from '$lib/store/store';
	import FaRegStickyNote from 'svelte-icons/fa/FaRegStickyNote.svelte';
	import type { Writable } from 'svelte/store';

	export let content: { private: boolean; note: string; type: string };
	export let edit: boolean;
	export let num_list_items: number;
	export let list_items: Writable<string[]>;
</script>

<div class="flex flex-col {content.private ? 'opacity-0' : 'opacity-100'} duration-200 px-2 gap-1">
	{#each $list_items as item, i}
		<div class="w-full flex items-center">
			<div class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}">
				<FaRegStickyNote />
			</div>
			<input
				id="item-{i}"
				name="item-{i}"
				bind:value={item}
				on:keydown={(e) => {
					edit = true;
					num_list_items += 1;
				}}
				class="bg-inherit border-none font-semibold text-base w-full outline-none"
			/>
		</div>
	{/each}
</div>
