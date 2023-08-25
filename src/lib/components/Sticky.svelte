<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import Card from '$lib/building_blocks/Card.svelte';
	import { current_folder_id, mode } from '$lib/store/store';

	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte';
	import FaEye from 'svelte-icons/fa/FaEye.svelte';
	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';

	import { enhance } from '$app/forms';
	import DOMPurify from 'dompurify';
	import { writable, type Writable } from 'svelte/store';

	import Default from './display_sticky_templates/Default.svelte';
	import List from './display_sticky_templates/List.svelte';
	import Password from './display_sticky_templates/Password.svelte';
	import Markdown from './display_sticky_templates/Markdown.svelte';
	import Recipe from './display_sticky_templates/Recipe.svelte';

	export let content: { title: string; note: string; private: boolean; id: number; type: string };
	let edit = false;
	let expand = false;

	const list_items: Writable<string[]> =
		content.type == 'List' ? writable(content.note.split('\n')) : writable([]);
	let num_list_items = $list_items.length

	const password_items: Writable<string[][]> =
		content.type == 'Password'
			? writable(content.note.split('\n').map((line) => line.split('🐐')))
			: writable([]);

	const ingredient_items: Writable<string[][]> =
		content.type == 'Recipe'
			? writable(
					content.note
						.split('🐐')[0]
						.split('\n')
						.map((ingredient) => ingredient.split('🚀'))
			  )
			: writable([]);
	const direction_items: Writable<string[][]> =
		content.type == 'Recipe'
			? writable(
					content.note
						.split('🐐')[1]
						.split('\n')
						.map((desc) => desc.split('🚀'))
			  )
			: writable([]);

	let num_ingredient_items = $ingredient_items.length;
	let num_direction_items = $direction_items.length;

	function sanitize_HTML(html_content: string) {
		const tempElement = document.createElement('div');
		tempElement.innerHTML = html_content;

		function process_node(node: HTMLElement) {
			if (node.nodeType === Node.TEXT_NODE) {
				return node.textContent;
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				let result = '';
				for (const child_node of node.childNodes) {
					result += process_node(child_node as HTMLElement);
				}
				if (node.tagName === 'P' || node.tagName === 'DIV') {
					result += '\n';
				} else if (node.tagName === 'BR') {
					result += '\n';
				}
				return result;
			} else {
				return '';
			}
		}

		return process_node(tempElement)?.trim();
	}

	function validate_html(html_content: string) {
		const sanitizedHTML = DOMPurify.sanitize(html_content);
		const is_safe = sanitizedHTML === html_content;

		return is_safe;
	}

	let input: HTMLInputElement;
	let p_content: HTMLParagraphElement;
</script>

<Card
	features="relative flex justify-between items-center p-2 transition duration-300 {content.private
		? 'outline outline-red-500 h-24'
		: ''}"
>
	<div class="absolute bottom-2 right-2 flex gap-2">
		<div
			class="duration-200 {content.private
				? 'opacity-100'
				: 'opacity-0'}  justify-center items-center px-2 bg-red-500 rounded-full flex-shrink-0"
		>
			<p class="text-white font-semibold text-[10px]">Private</p>
		</div>
		{#if content.type == 'Sensitive'}
			<div
				class="duration-200 justify-center items-center px-2 bg-blue-500 rounded-full flex-shrink-0"
			>
				<p class="text-white font-semibold text-[10px]">Sensitive</p>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-2 w-full h-full relative">
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div on:dblclick={() => (expand = !expand)} class="flex gap-2 items-center">
			<input
				disabled={content.private}
				on:input={() => {
					edit = true;
				}}
				bind:this={input}
				class="bg-inherit border-none text-xl font-bold w-full outline-none {$mode
					? 'text-white'
					: 'text-black'}"
				bind:value={content.title}
			/>
		</div>

		{#if content.type === 'Default'}
			<Default bind:content bind:p_content bind:edit />
		{:else if content.type === 'List'}
			<List bind:content bind:edit bind:num_list_items {list_items}/>
		{:else if content.type === 'Password'}
			<Password bind:content bind:edit {password_items} />
		{:else if content.type == 'Sensitive'}
			<Default bind:content bind:p_content bind:edit />
		{:else if content.type == 'Recipe'}
			<Recipe bind:content bind:edit bind:num_direction_items bind:num_ingredient_items {ingredient_items} {direction_items} />
		{:else if content.type == 'Markdown'}
			<Markdown bind:content bind:p_content bind:edit/>
		{/if}
	</div>

	<div class="absolute flex justify-end w-1/2 gap-1 top-2 right-2 duration-300">
		<form
			method="POST"
			use:enhance={({ formData, cancel }) => {
				if (content.type == 'List') {
					list_items.set($list_items.filter((curr) => curr !== ''));
					let sanitized_list = $list_items.join('\n');
					formData.set('description', sanitized_list);
					num_list_items = 0;
					return async ({ result, update }) => {
						await update();
						edit = false;
					};
				} else if (content.type == 'Default') {
					let sanitized_content = sanitize_HTML(p_content.innerHTML);
					formData.set('description', sanitized_content ?? content.note);
					return async ({ result, update }) => {
						await update();
						p_content.textContent = content.note;
						edit = false;
					};
				} else if (content.type == 'Password') {
					let sanitized_content = $password_items.map((line) => line.join('🐐')).join('\n');
					formData.set('description', sanitized_content ?? content.note);
					return async ({ result, update }) => {
						await update();
						edit = false;
					};
				} else if (content.type == 'Sensitive') {
					let sanitized_content = sanitize_HTML(p_content.innerHTML);
					formData.set('description', sanitized_content ?? content.note);
					return async ({ result, update }) => {
						await update();
						p_content.textContent = content.note;
						edit = false;
					};
				} else if (content.type == 'Recipe') {
					let sanitized_ingredients = $ingredient_items
						.map((ingred) => ingred.join('🚀'))
						.join('\n');
					let sanitized_directions = $direction_items.join('\n');
					let sanitized_content = `${sanitized_ingredients}🐐${sanitized_directions}`;
					formData.set('description', sanitized_content ?? content.note);
					return async ({ result, update }) => {
						await update();
						edit = false;
					};
				} else if (content.type == 'Markdown') {
					let sanitized_content = sanitize_HTML(p_content.innerHTML);
					formData.set('description', sanitized_content ?? content.note);
					return async ({ result, update }) => {
						await update();
						p_content.textContent = content.note;
						edit = false;
					};
				}
			}}
		>
			<input type="hidden" id="id" name="id" bind:value={content.id} />
			<input type="hidden" id="title" name="title" bind:value={content.title} />
			<input type="hidden" id="is_private" name="is_private" bind:value={content.private} />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			{#if edit}
				<Button
					formaction="/stickies?/update_sticky"
					variant="icon-features"
					type="submit"
					features="border-2 border-blue-500 p-2 hover:bg-blue-500 hover:rounded-lg"
				>
					<FaCheck />
				</Button>
			{/if}
		</form>

		{#if content.type === 'List' && !content.private}
			<Button
				variant="icon"
				type="button"
				on:click={() => {
					edit = true;
					list_items.update((curr) => [...curr, 'Item']);
				}}
			>
				<MdPlaylistAdd />
			</Button>
		{/if}

		<Button
			variant="icon"
			on:click={() => {
				edit = true;
				content.private = !content.private;
			}}
		>
			{#if content.private}
				<FaEyeSlash />
			{:else}
				<FaEye />
			{/if}
		</Button>

		<form method="POST" use:enhance>
			<input type="hidden" name="id" id="id" bind:value={content.id} />
			<Button
				variant="icon"
				formaction="/stickies?/delete_sticky"
				type="submit"
				features="hover:text-red-600 p-2"
			>
				<MdDelete />
			</Button>
		</form>
	</div>
</Card>
