<script>
	import Button from '$lib/building_blocks/Button.svelte';
	import { mode } from '$lib/store/store';
	import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import Link from '$lib/building_blocks/Link.svelte';
	import FaStickyNote from 'svelte-icons/fa/FaStickyNote.svelte';
	import { enhance } from '$app/forms';



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
    <form method="POST" use:enhance>
		<Button formaction="/auth?/logout" variant="secondary" type="submit" features="font-semibold"
			>Logout</Button
		>
	</form>
</div>
<div class="flex h-screen">
	<slot />
</div>
