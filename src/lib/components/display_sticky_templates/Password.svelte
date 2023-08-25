<script lang="ts">
	import { mode } from '$lib/store/store';
	import FaRegStickyNote from 'svelte-icons/fa/FaRegStickyNote.svelte';
	import FaUserSecret from 'svelte-icons/fa/FaUserSecret.svelte';
	import FaUserTie from 'svelte-icons/fa/FaUserTie.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';
	import type { Writable } from 'svelte/store';

	export let content: { private: boolean };
	export let password_items: Writable<string[][]>;
	export let edit: boolean;
</script>

<div class="flex flex-col {content.private ? 'opacity-0' : 'opacity-100'} duration-200 px-2 gap-1">
	{#each $password_items as item, i}
		<div class="w-full flex items-center gap-2">
			<div class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}">
				<FaRegStickyNote />
			</div>
			<input
				id="label-{i}"
				name="label-{i}"
				bind:value={item[0]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/5 outline-none"
			/>
			<div class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}">
				<FaUserTie />
			</div>
			<input
				id="username-{i}"
				name="username-{i}"
				bind:value={item[1]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/4 outline-none"
			/>

			<div class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}">
				<FaUserSecret />
			</div>
			<input
				id="password-{i}"
				name="password-{i}"
				bind:value={item[2]}
				on:input={(e) => {
					edit = true;
				}}
				class="bg-inherit border-none font-semibold text-base w-1/4 outline-none duration-500 {$mode
					? 'bg-neutral-800 hover:text-white hover:bg-inherit'
					: 'bg-zinc-100 hover:text-black hover:bg-inherit'} text-transparent"
			/>
			<button
				on:click={() => {
					navigator.clipboard.writeText(item[2]);
				}}
				class="w-4 h-4 justify-center items-center flex {$mode
					? 'text-blue-500 hover:text-green-400'
					: 'text-blue-500 hover:text-green-500'}"
			>
				<MdContentCopy />
			</button>
		</div>
	{/each}
</div>
