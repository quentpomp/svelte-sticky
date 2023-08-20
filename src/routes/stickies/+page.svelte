<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/building_blocks/Button.svelte';
	import AddSticky from '$lib/components/AddSticky.svelte';
	import Notes from '$lib/components/Notes.svelte';
	import Popout from '$lib/components/Popout.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { mode, toggle_popup } from '$lib/store/store';
	import { onMount } from 'svelte';

	export let data: { stickies: any };
	export let form;
	let toggle_toast = true;

	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<Popout>
	<AddSticky />
</Popout>

<div
	class="md:h-full w-full gap-2 {$mode
		? 'bg-neutral-900'
		: 'bg-[#fafafa]'} pt-12 px-12 pb-8 md:pt-24 md:px-24 md:pb-16"
>
	<Notes stickies={data.stickies} />
</div>

{#if form?.subscription}
	<Toast message="Upgrade to Pro to create more stickies." />
{/if}

{#if form?.invalid}
	<Toast message="Something went wrong. You may have left some fields empty." />
{/if}
