<script lang="ts">
	import Upgrade from '$lib/components/Upgrade.svelte';
	import { mode } from '$lib/store/store';
	import { onMount } from 'svelte';
	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<div
	class="h-full w-full display flex justify-center flex-wrap items-center gap-2 {$mode
		? 'bg-neutral-900'
		: 'bg-[#fafafa]'} pt-12 px-12 pb-8 md:pt-24 md:px-24 md:pb-16"
>
	<Upgrade />
</div>
