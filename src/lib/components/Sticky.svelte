<script lang="ts">
	import Button from '$lib/building_blocks/Button.svelte';
	import Card from '$lib/building_blocks/Card.svelte';
	import { current_folder_id, mode } from '$lib/store/store';

	import MdDelete from 'svelte-icons/md/MdDelete.svelte';

	import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte';
	import FaEye from 'svelte-icons/fa/FaEye.svelte';

	import FaCheck from 'svelte-icons/fa/FaCheck.svelte';

	import FaUserTie from 'svelte-icons/fa/FaUserTie.svelte';
	import FaUserSecret from 'svelte-icons/fa/FaUserSecret.svelte';
	import MdContentCopy from 'svelte-icons/md/MdContentCopy.svelte';

	import FaRegStickyNote from 'svelte-icons/fa/FaRegStickyNote.svelte';
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';

	import { enhance } from '$app/forms';
	import DOMPurify from 'dompurify';
	import { writable, type Writable } from 'svelte/store';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaUtensilSpoon from 'svelte-icons/fa/FaUtensilSpoon.svelte';

	import { marked } from 'marked';

	export let content: { title: string; note: string; private: boolean; id: number; type: string };
	let edit = false;
	let expand = false;

	let list_items: Writable<string[]> =
		content.type == 'List' ? writable(content.note.split('\n')) : writable([]);
	let num_list_items = $list_items.length;

	let password_items: Writable<string[][]> =
		content.type == 'Password'
			? writable(content.note.split('\n').map((line) => line.split('🐐')))
			: writable([]);

	let ingredient_items: Writable<string[][]> =
		content.type == 'Recipe'
			? writable(
					content.note
						.split('🐐')[0]
						.split('\n')
						.map((ingredient) => ingredient.split('🚀'))
			  )
			: writable([]);
	let direction_items: Writable<string[][]> =
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
	let c = '\u2022';
</script>

<!-- on:dblclick={() => toggle_popup.update(() => true)}
variant='button' -->

<Card
	features="relative flex justify-between items-center p-2 transition duration-300 {content.private
		? 'outline outline-orange-500 h-24'
		: ''}"
>
	<div class="absolute bottom-2 right-2 flex gap-2">
		<div
			class="duration-200 {content.private
				? 'opacity-100'
				: 'opacity-0'}  justify-center items-center px-2 bg-orange-500 rounded-full flex-shrink-0"
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
					? 'disabled:text-white '
					: 'disabled:text-black '}"
				bind:value={content.title}
			/>
		</div>

		{#if content.type === 'Default'}
			<p
				contenteditable={!content.private}
				on:input={() => {
					edit = true;
				}}
				bind:this={p_content}
				class="w-full px-4 {$mode
					? 'text-zinc-400'
					: 'text-zinc-700'} outline-none border-none font-semibold duration-200 {content.private
					? 'opacity-0 hidden'
					: 'opacity-100 inline-block'}"
			>
				{content.note}
			</p>
		{:else if content.type === 'List'}
			<div
				class="flex flex-col {content.private
					? 'opacity-0'
					: 'opacity-100'} duration-200 px-2 gap-1"
			>
				{#each $list_items as item, i}
					<div class="w-full flex items-center">
						<div
							class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}"
						>
							<FaRegStickyNote />
						</div>
						<input
							id="item-{i}"
							name="item-{i}"
							bind:value={item}
							on:keydown={(e) => {
								// if (e.key == 'Enter') {
								// 	list_items.update((curr) => [...curr, 'Item']);
								// 	num_list_items += 1;
								// 	let new_input = document.getElementById(`item-${i + 1}`);
								// 	if (new_input) new_input.focus();
								// }
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-full outline-none"
						/>
					</div>
				{/each}
			</div>
		{:else if content.type === 'Password'}
			<div
				class="flex flex-col {content.private
					? 'opacity-0'
					: 'opacity-100'} duration-200 px-2 gap-1"
			>
				{#each $password_items as item, i}
					<div class="w-full flex items-center gap-2">
						<div
							class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}"
						>
							<FaRegStickyNote />
						</div>
						<input
							id="label-{i}"
							name="label-{i}"
							bind:value={item[0]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-1/5 outline-none"
						/>
						<div
							class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}"
						>
							<FaUserTie />
						</div>
						<input
							id="username-{i}"
							name="username-{i}"
							bind:value={item[1]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-1/4 outline-none"
						/>

						<div
							class="w-3 h-3 justify-center items-center flex {$mode ? 'text-white' : 'text-black'}"
						>
							<FaUserSecret />
						</div>
						<input
							id="password-{i}"
							name="password-{i}"
							bind:value={item[2]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-1/4 outline-none duration-500 {$mode
								? 'bg-neutral-800 hover:text-white hover:bg-inherit'
								: 'bg-zinc-100 hover:text-black hover:bg-inherit'} text-transparent"
						/>
						<button
							on:click={() => {
								navigator.clipboard.writeText(item[2]);
							}}
							class="w-4 h-4 justify-center items-center flex {$mode
								? 'text-blue-500 hover:text-green-400'
								: 'text-blue-500 hover:text-green-500'}"
						>
							<MdContentCopy />
						</button>
					</div>
				{/each}
			</div>
		{:else if content.type == 'Sensitive'}
			<p
				contenteditable={!content.private}
				on:input={() => {
					edit = true;
				}}
				bind:this={p_content}
				class="w-full px-4 {$mode
					? 'text-zinc-400'
					: 'text-zinc-700'} outline-none border-none font-semibold duration-200 {content.private
					? 'opacity-0 hidden'
					: 'opacity-100 inline-block'}"
			>
				{content.note}
			</p>
		{:else if content.type == 'Recipe'}
			<div class="flex flex-col {content.private ? 'opacity-0' : 'opacity-100'} duration-200 gap-1">
				<div class="font-semibold text-base flex justify-between w-full items-center">
					<p class="ml-2">Ingredients</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => {
							edit = true;
							ingredient_items.update((curr) => [...curr, ['1', 'oz', 'salt']]);
							num_ingredient_items += 1;
						}}
					>
						<MdPlaylistAdd />
					</Button>
				</div>
				{#each $ingredient_items as item, i}
					<div class="w-full flex items-center px-2">
						<div class="w-3 h-3 justify-center items-center flex text-yellow-400">
							<FaLemon />
						</div>
						<input
							id="amount-{i}"
							name="amount-{i}"
							bind:value={item[0]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-1/12 outline-none py-0"
						/>

						<input
							id="unit-{i}"
							name="unit-{i}"
							bind:value={item[1]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-1/12 outline-none py-0"
						/>

						<input
							id="ingredient-{i}"
							name="ingredient-{i}"
							bind:value={item[2]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit borde-none font-semibold text-base w-1/2 outline-none py-0"
						/>
					</div>
				{/each}

				<div class="font-semibold text-base flex justify-between w-full items-center">
					<p class="ml-2">Directions</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => {
							edit = true;
							direction_items.update((curr) => [...curr, ['Add a pinch of salt...']]);
							num_direction_items += 1;
						}}
					>
						<MdPlaylistAdd />
					</Button>
				</div>
				{#each $direction_items as item, i}
					<div class="w-full flex items-center px-2">
						<div class="w-3 h-3 justify-center items-center flex text-blue-500">
							<FaUtensilSpoon />
						</div>
						<input
							id="amount-{i}"
							name="amount-{i}"
							bind:value={item[0]}
							on:input={(e) => {
								edit = true;
							}}
							class="bg-inherit border-none font-semibold text-base w-full outline-none py-0"
						/>
					</div>
				{/each}
			</div>
		{:else if content.type == 'Markdown'}
			<button
				on:click={() => {
					edit = true;
				}}
				class="prose-sm w-full px-4 {$mode
					? 'text-white'
					: 'text-black'}  outline-none border-none duration-200  {content.private
					? 'opacity-0 hidden'
					: 'opacity-100'} {!edit ? 'opacity-100 text-left' : 'opacity-0 hidden'}"
			>
				{@html marked(content.note)}
			</button>
			<div
				contenteditable={!content.private}
				bind:this={p_content}
				class="w-full px-4   {$mode
					? 'white'
					: 'text-black'} outline-none border-none duration-200 {content.private
					? 'opacity-0 hidden'
					: 'opacity-100 inline-block'} {edit ? 'opacity-100 inline-block' : 'opacity-0 hidden'}"
			>
				{content.note}
			</div>
		{/if}
	</div>

	<div class="absolute flex gap-1 top-2 right-2 duration-300">
		<form
			method="POST"
			use:enhance={({ formData, cancel }) => {
				if (content.type == 'List') {
					list_items.set($list_items.filter((curr) => curr !== ''));
					let sanitized_list = $list_items.join('\n');
					num_list_items = 0;
					formData.set('description', sanitized_list);

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
			{#if content.type === 'List' && !content.private}
				<Button
					variant="icon"
					type="button"
					on:click={() => {
						edit = true;
						list_items.update((curr) => [...curr, 'Item']);
						num_list_items += 1;
					}}
				>
					<MdPlaylistAdd />
				</Button>
			{/if}
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
