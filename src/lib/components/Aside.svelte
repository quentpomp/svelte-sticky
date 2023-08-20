<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import Link from '$lib/building_blocks/Link.svelte';
	import { mode } from '$lib/store/store';
	import FaAngleDoubleLeft from 'svelte-icons/fa/FaAngleDoubleLeft.svelte';
	import MdMenu from 'svelte-icons/md/MdMenu.svelte';
    import FaStickyNote from 'svelte-icons/fa/FaStickyNote.svelte'
	import { page } from '$app/stores';

	export let features: string = '';
	let width = 256;

	let is_resizing = false;
	let initial_x = 0;

	let resizer: HTMLDivElement;

	function mouse_down(event: MouseEvent) {
		event.preventDefault();
		is_resizing = true;
		initial_x = event.clientX;
		window.addEventListener('mousemove', mouse_move);
	}

	function mouse_up() {
		is_resizing = false;
	}

	function mouse_move(event: MouseEvent) {
		event.preventDefault();
		if (!is_resizing) return;
		window.addEventListener('mouseup', mouse_up);
		setTimeout(() => {
			const delta_x = event.clientX - initial_x;

			if (width + delta_x < 384 && width + delta_x > 255) width += delta_x + 0.1;

			initial_x = event.clientX;

			// window.addEventListener('mousemove', mouse_move);
		}, 200);
	}

	$: style = `width: ${width}px;`;
</script>

{#if width > 0}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="group hidden md:flex relative h-screen z-50 transition ease-linear {$mode
			? 'bg-zinc-900 '
			: 'bg-[#f4f4f5]'} {features}"
		{style}
	>
		<div class="absolute duration-200 top-2 left-2">
            <Link href="/" variant="icon">
                <FaStickyNote />
            </Link>
		</div>
		<div class="group-hover:opacity-100 opacity-0 duration-200 absolute top-2 right-2">
			<Button
				variant="icon"
				on:click={() => {
					let interval = setInterval(() => {
						if (width <= 0) {
							clearInterval(interval);
						}
						width -= 16;
					}, 10);
				}}
			>
				<FaAngleDoubleLeft />
			</Button>
		</div>
		<!-- <p class='absolute bottom-2 left-2 truncate w-full text-sm'>{$page.data.user.username}</p> -->

		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			on:mousedown={mouse_down}
			on:mouseup={mouse_up}
			on:mousemove={mouse_move}
			bind:this={resizer}
			class="absolute right-0 h-screen w-[2px] hover:w-1 duration-100 cursor-col-resize {$mode
				? 'bg-zinc-700'
				: 'bg-gray-200'}"
		/>
        <slot />
	</div>
{:else}
	<div class="fixed top-2 left-2">
		<Button
			variant="icon"
			on:click={() => {
				let interval = setInterval(() => {
					if (width >= 256) {
						clearInterval(interval);
					}
					width += 16;
				}, 10);
			}}
		>
			<MdMenu />
		</Button>
	</div>
{/if}
