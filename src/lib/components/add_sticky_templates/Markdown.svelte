<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { current_folder_id, mode } from '$lib/store/store';
	import { marked } from 'marked';

	export let markdown: string;
	export let button_selected: string;
	export let is_private: boolean;
</script>

<div class="w-full h-full flex flex-col gap-1 overflow-scroll">
	<textarea
		placeholder="Write your markdown here..."
		class="resize-none bg-inherit border-none outline-none font-semibold text-base py-2 px-0 w-full h-1/2 {$mode
			? 'text-zinc-400 disabled:text-zinc-400 '
			: 'text-zinc-700 disabled:text-zinc-700'}"
		bind:value={markdown}
	/>
	<div class="w-full block h-1/2 overflow-scroll font-semibold prose-sm">
		{@html marked(markdown)}
	</div>
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
