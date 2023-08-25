<script lang="ts">
	import { mode } from '$lib/store/store';
	import { marked } from 'marked';

	export let content: { private: boolean; note: string };
	export let edit: boolean;
	export let p_content: HTMLParagraphElement;
</script>

<button
	on:click={() => {
		edit = true;
	}}
	class="prose-sm w-full px-4 {$mode
		? 'text-white'
		: 'text-black'}  outline-none border-none duration-200 {content.private
		? 'opacity-0 hidden'
		: 'opacity-100'} {!edit ? 'opacity-100 text-left' : 'opacity-0 hidden'}"
>
	{@html marked(content.note)}
</button>
<div
	contenteditable={!content.private}
	bind:this={p_content}
	class="w-full px-4 {$mode
		? 'white'
		: 'text-black'} outline-none border-none duration-200 {content.private
		? 'opacity-0 hidden'
		: 'opacity-100 inline-block'} {edit ? 'opacity-100 inline-block' : 'opacity-0 hidden'}"
>
	{content.note}
</div>
