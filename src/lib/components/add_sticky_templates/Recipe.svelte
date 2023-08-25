<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { current_folder_id } from '$lib/store/store';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaUtensilSpoon from 'svelte-icons/fa/FaUtensilSpoon.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';

	export let num_ingredients: number;
	export let num_directions: number;
	export let is_private: boolean;
	export let button_selected: string;
</script>

<div class="w-full h-full flex-col gap-3 overflow-scroll relative">
	<div class="font-semibold text-lg flex justify-between items-center">
		<p>Ingredients</p>
		<Button
			variant="icon"
			type="button"
			features="flex-shrink-0"
			on:click={() => (num_ingredients += 1)}
		>
			<MdPlaylistAdd />
		</Button>
	</div>
	{#each { length: num_ingredients } as _, i}
		{#key i}
			<div id={`ingred-container-${i}`} class="flex gap-2 items-center py-2 relative">
				<div class="w-3 h-3 flex items-center justify-center text-yellow-400">
					<FaLemon />
				</div>
				<input
					placeholder="Amount"
					id="amount-{i}"
					name="amount-{i}"
					class="bg-inherit border-none font-semibold text-sm w-1/5 outline-none"
				/>
				<input
					placeholder="Unit"
					id="unit-{i}"
					name="unit-{i}"
					class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
				/>
				<input
					placeholder="Ingredient"
					id="ingredient-{i}"
					name="ingredient-{i}"
					class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
				/>
				<Button
					type="button"
					variant="icon"
					features="duration-200 absolute right-0 hover:text-red-600"
                    on:click={() => {
                        const container = document.getElementById(`ingred-container-${i}`);
                        container?.remove();
                    }}
				>
					<MdDelete />
				</Button>
			</div>
		{/key}
	{/each}
	<div class="h-10" />
	<div class="font-semibold text-lg flex justify-between items-center">
		<p>Directions</p>
		<Button
			variant="icon"
			type="button"
			features="flex-shrink-0"
			on:click={() => (num_directions += 1)}
		>
			<MdPlaylistAdd />
		</Button>
	</div>

	{#each { length: num_directions } as _, i}
		{#key i}
			<div class="flex gap-2 items-center py-2 relative" id={`direction-container-${i}`}>
				<div class="w-3 h-3 flex items-center justify-center text-blue-500">
					<FaUtensilSpoon />
				</div>
				<input
					placeholder="Direction"
					id="direction-{i}"
					name="direction-{i}"
					class="bg-inherit border-none font-semibold text-sm w-3/4 outline-none"
				/>
				<Button
					type="button"
					variant="icon"
					features="duration-200 absolute right-0 hover:text-red-600"
                    on:click={() => {
                        const container = document.getElementById(`direction-container-${i}`);
                        container?.remove();
                    }}
				>
					<MdDelete />
				</Button>
			</div>
		{/key}
	{/each}
</div>
<input type="hidden" bind:value={button_selected} id="type" name="type" />
<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
<Button
	variant="primary"
	formaction="/stickies?/add_sticky"
	type="submit"
	features="font-semibold absolute bottom-4 right-8">Create</Button
>
