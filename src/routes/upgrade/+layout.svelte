<script>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Button from "$lib/building_blocks/Button.svelte";


	import Link from "$lib/building_blocks/Link.svelte";
	import UserDropdown from "$lib/components/UserDropdown.svelte";
	import { mode } from "$lib/store/store";
	import FaMoon from "svelte-icons/fa/FaMoon.svelte";
	import FaStickyNote from "svelte-icons/fa/FaStickyNote.svelte";
	import MdSettings from "svelte-icons/md/MdSettings.svelte";
	import MdWbSunny from "svelte-icons/md/MdWbSunny.svelte";

    export let data;
    let toggle_user_dropdown = false;

</script>
<div class="absolute top-2 right-2 z-50 flex gap-2">
	<Link href="/stickies" variant="icon"><FaStickyNote /></Link>
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
			{#if data.user?.profile_picture.length}
				<img
					src={data.user.profile_picture}
					alt={data.user.username}
					class="w-full h-full object-cover rounded-sm"
				/>
			{:else}
				<p class="text-sm capitalize font-semibold">{data.user?.username[0]}</p>
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
	<slot />
</div>