<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { current_folder_id, mode } from '$lib/store/store';
	import FaFolder from 'svelte-icons/fa/FaFolder.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';

	export let folders: { id: number; name: string; parent_id: number; open: boolean }[] = [];

	// async function getFilesForFolder(folderId) {
	//   // Fetch files for the given folder from the backend
	//   const filesResponse = await $fetch(`/api/getFiles/${folderId}`);
	//   files = await filesResponse.json();
	// }

	function handle_folder_click(folder_id: number) {
		const folder = folders.find((f) => f.id === folder_id);
		if (folder) folder.open = !folder.open;
	}
</script>

<main>
	<div class="flex flex-col duration-200">
		{#each folders as folder}
			<button
				class="flex gap-2 items-center px-1 ml-1 py-1 {$mode
					? 'hover:bg-zinc-700'
					: 'hover:bg-zinc-200'} rounded-md overflow-hidden group/folder"
			>
				<button
					on:click={() => {
						current_folder_id.update(() => folder.id);
						let update_url = new URL($page.url);
						update_url.searchParams.set('folder', $current_folder_id.toString());

						if (browser) goto(update_url);
					}}
					class="w-4 h-4 flex justify-center items-center flex-shrink-0"
				>
					<FaFolder />
				</button>
				<form method="POST" use:enhance class="flex items-center justify-between">
					<input
						class="bg-inherit border-none outline-none px-0 py-0 w-3/4"
						bind:value={folder.name}
						id="name"
						name="name"
					/>
					<input type="hidden" bind:value={folder.id} name="id" id="id" />
					<input type="hidden" bind:value={folder.parent_id} name="parent_id" id="parent_id" />

					<button class="hidden" formaction="/stickies?/update_folder" />
					<button
						class="opacity-0 group-hover/folder:opacity-100 text-red-500 w-4 h-4 flex justify-center items-center"
						formaction="/stickies?/delete_folder"
					>
						<MdDelete />
					</button>
				</form>
			</button>
		{/each}
	</div>
</main>
