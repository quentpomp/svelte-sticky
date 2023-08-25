<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import { mode, toggle_popup } from '$lib/store/store';
	import FaAngleDoubleRight from 'svelte-icons/fa/FaAngleDoubleRight.svelte';

	let width = 0;
	let screen_width = 0;
	$: style = `width: ${width}px;`;

	toggle_popup.subscribe((toggle) => {
		if (toggle) {
			let interval = setInterval(() => {
				if (width >= Math.min(650, screen_width - 20)) {
					clearInterval(interval);
				}
				width += 16;
			}, 5);
		} else {
			let interval = setInterval(() => {
				if (width <= 0) {
					clearInterval(interval);
				}
				width -= 16;
			}, 5);
		}
	});
</script>

<svelte:window bind:innerWidth={screen_width} />

<div
	class="fixed z-50 right-0 h-screen {$mode
		? 'bg-zinc-900 text-white'
		: 'bg-[#f4f4f5] text-black'} group"
	{style}
>
<div>
	<Button
		variant="icon"
		features="absolute top-2 left-2 group-hover:opacity-100 opacity-0 duration-200"
		on:click={() => toggle_popup.update(() => false)}
	>
		<FaAngleDoubleRight />
	</Button>
</div>

	<slot />
</div>
