<script>
	import Button from '$lib/building_blocks/Button.svelte';
	import { mode } from '$lib/store/store';
	import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import Link from '$lib/building_blocks/Link.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import UserDropdown from '$lib/components/UserDropdown.svelte';

	let toggle_folders = false;
	let toggle_user_dropdown = false;

	export let data;
</script>

<div class="absolute top-2 right-2 z-50 flex gap-2">
	<Link href="/settings" variant="icon"><MdSettings /></Link>
	<Button variant="icon" on:click={() => mode.set(Math.abs($mode - 1))}>
		{#if $mode}
			<MdWbSunny />
		{:else}
			<FaMoon />
		{/if}
	</Button>
	<div class="relative h-full">
		<Button
			variant="icon"
			features="p-0 overflow-hidden flex-shrink-0"
			on:click={() => (toggle_user_dropdown = !toggle_user_dropdown)}
		>
			{#if $page.data.user?.profile_picture.length}
				<img
					src={$page.data.user.profile_picture}
					alt={$page.data.user.username}
					class="w-full h-full object-cover rounded-sm"
				/>
			{:else}
				<p class="text-sm capitalize font-semibold">{$page.data.user?.username[0]}</p>
			{/if}
		</Button>
		{#if toggle_user_dropdown}
			<UserDropdown />
		{/if}
	</div>

	<form method="POST" use:enhance>
		<Button formaction="/auth?/logout" variant="secondary" type="submit" features="font-semibold"
			>Logout
		</Button>
	</form>
</div>
<div class="flex h-screen">
	<!-- {#if data.user?.tier == 'PRO'}
	<Aside
		features="{$mode
			? 'text-zinc-300 placeholder:text-zinc-200'
			: 'text-black placeholder:text-black'} font-semibold overflow-scroll"
	>
		<div class="w-full h-full px-4 py-16 text-sm flex flex-col gap-0">
			<div class="flex gap-2 items-center p-1">
				<div class="w-3 h-3 flex justify-center items-center flex-shrink-0">
					<FaSearch />
				</div>
				<input placeholder="Search" class="bg-inherit border-none outline-none px-0" />
			</div>

			<div
				class="flex items-center justify-between p-1 rounded-md {$mode
					? 'hover:bg-zinc-700'
					: 'hover:bg-zinc-200'}"
			>
				<button
					class="flex gap-2 items-center"
					on:click={() => {
						toggle_folders = !toggle_folders;
						let update_url = new URL($page.url);
						if (browser) goto(update_url);
					}}
				>
					<div class="w-4 h-4 flex justify-center items-center flex-shrink-0">
						<FaFolder />
					</div>
					<p>Folders</p>
				</button>
				<form
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							await update();
							toggle_folders = true;
						};
					}}
					action="/stickies?/add_folder"
				>
					<input type="hidden" id="parent_id" name="parent_id" bind:value={$current_folder_id} />
					<button class="w-4 h-4 flex justify-center items-center flex-shrink-0">
						<FaFolderPlus />
					</button>
				</form>
			</div>
			{#if toggle_folders}
				<Tree folders={data.folders} />
			{/if}
		</div>
	</Aside>
	{/if} -->
	<slot />
</div>
