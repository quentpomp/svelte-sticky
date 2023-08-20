<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { mode, toggle_toast } from '$lib/store/store';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	export let message: string;
	
</script>

{#if $toggle_toast}
	<div
		class="fixed rounded-lg bottom-4 right-4 flex gap-4 items-center px-4 py-2 border-2 {$mode
			? ' border-orange-500  text-white'
			: ' border-orange-500 text-black'}"
	>
		<a href='/upgrade' class='font-semibold text-sm'>{message}</a>
		<Button variant="icon" on:click={() => ($toggle_toast = false)}>
			<MdClose />
		</Button>
	</div>
{/if}
