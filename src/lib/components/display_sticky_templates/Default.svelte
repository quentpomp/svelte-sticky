<script lang="ts">
	import { mode } from '$lib/store/store';

	export let content: { private: boolean; note: string };
	export let edit: boolean;
	export let p_content: HTMLParagraphElement;
</script>

<p
	contenteditable={!content.private}
	on:input={() => {
		edit = true;
	}}
	bind:this={p_content}
	class="w-full px-4 {$mode
		? 'text-white'
		: 'text-black'} outline-none border-none font-semibold duration-200 {content.private
		? 'opacity-0 hidden'
		: 'opacity-100 inline-block'}"
>
	{content.note}
</p>
