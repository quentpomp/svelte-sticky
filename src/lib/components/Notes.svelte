<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { mode, toggle_popup } from '$lib/store/store';
	import Sticky from './Sticky.svelte';
	import MdNoteAdd from 'svelte-icons/md/MdNoteAdd.svelte';
	export let stickies: any;
</script>

<div class="w-full h-full flex flex-col  gap-3 overflow-y-scroll no-scrollbar px-1 pb-1 bg-inherit">
	<div
		class="outline {$mode
			? 'bg-neutral-900 outline-neutral-900'
			: 'bg-[#fafafa] outline-[#fafafa]'} z-10 py-2 sticky top-0 left-0 w-full flex items-center justify-between opacity-90"
	>
		<button
			on:click={() => toggle_popup.update(() => !$toggle_popup)}
			class="text-2xl font-bold {$mode ? 'text-white' : 'text-black'}">Notes</button
		>
		<Button variant="icon" on:click={() => toggle_popup.update(() => true)}>
			<MdNoteAdd />
		</Button>
	</div>

	{#each stickies as sticky}
		{#key sticky}
			<Sticky
				content={{
					title: sticky.title,
					note: sticky.description,
					private: sticky.is_private,
					id: sticky.id,
					type: sticky.type
				}}
			/>
		{/key}
	{/each}
</div>
