<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { text } from '@sveltejs/kit';
	import { onMount } from 'svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaUtensilSpoon from 'svelte-icons/fa/FaUtensilSpoon.svelte';
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';
	import type { Writable } from 'svelte/store';

	export let content: { private: boolean; note: string };
	export let edit: boolean;
	export let ingredient_items: Writable<string[][]>;
	export let num_ingredient_items: number;
	export let direction_items: Writable<string[][]>;
	export let num_direction_items: number;

	const handle_direction_input = (e: Event, idx: number) => {
		edit = true;
		console.log(e);
		
		direction_items.update((items) => {
			console.log("ITEM", items[idx])
			// @ts-ignore
			
			items[idx][0] = e.target?.innerHTML;
      		return items;
    	});
		console.log(e.target)
		// e.target?.textContent = $direction_items[idx][0];
    	// let curr_direction = document.getElementById(`direction-${idx}`)
		// if (!curr_direction) return;
		// curr_direction.textContent = $direction_items[idx][0];
	}

</script>

<div class="flex flex-col {content.private ? 'opacity-0' : 'opacity-100'} duration-200 gap-1">
	<div class="font-semibold text-base flex justify-between w-full items-center">
		<p class="ml-2">Ingredients</p>
		<Button
			variant="icon"
			type="button"
			features="flex-shrink-0"
			on:click={() => {
				edit = true;
				ingredient_items.update((curr) => [...curr, ['1', 'oz', 'salt']]);
				num_ingredient_items += 1;
			}}
		>
			<MdPlaylistAdd />
		</Button>
	</div>
	{#each $ingredient_items as item, i}
		<div class="w-full flex items-center px-2">
			<div class="w-3 h-3 justify-center items-center flex text-yellow-400">
				<FaLemon />
			</div>
			<input
				id="amount-{i}"
				name="amount-{i}"
				bind:value={item[0]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/4 outline-none py-0"
			/>

			<input
				id="unit-{i}"
				name="unit-{i}"
				bind:value={item[1]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/4 outline-none py-0"
			/>

			<input
				id="ingredient-{i}"
				name="ingredient-{i}"
				bind:value={item[2]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/2 outline-none py-0"
			/>
		</div>
	{/each}

	<div class="font-semibold text-base flex justify-between w-full items-center">
		<p class="ml-2">Directions</p>
		<Button
			variant="icon"
			type="button"
			features="flex-shrink-0"
			on:click={() => {
				edit = true;
				direction_items.update((curr) => [...curr, ['Add a pinch of salt...']]);
				num_direction_items += 1;
			}}
		>
			<MdPlaylistAdd />
		</Button>
	</div>
	{#each $direction_items as item, i}
		<div class="w-full flex items-center px-2">
			<div class="w-3 h-3 justify-center items-center flex text-blue-500">
				<FaUtensilSpoon />
			</div>
			<!-- <textarea
				id="direction-{i}"
				name="direction-{i}"
				bind:value={item[0]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-full outline-none py-0 resize-none"
			/> -->
			<p
				contenteditable={!content.private}
				on:input={(e) => {
					edit = true;
					// handle_direction_input(e, i)
				}}
				id='display-direction-{i}'
				class="w-full px-4 outline-none border-none font-semibold duration-200 {content.private
					? 'opacity-0 hidden'
					: 'opacity-100 inline-block'}"
			>
				{item[0]}
			</p>
		</div>
	{/each}
</div>

<!-- export let p_content: HTMLParagraphElement;
</script>

<p
	contenteditable={!content.private}
	on:input={() => {
		edit = true;
	}}
	bind:this={p_content}
	class="w-full px-4 {$mode
		? 'text-white'
		: 'text-black'} outline-none border-none font-semibold duration-200 {content.private
		? 'opacity-0 hidden'
		: 'opacity-100 inline-block'}"
>
	{content.note}
</p> -->
