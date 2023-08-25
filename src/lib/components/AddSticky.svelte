<script lang="ts">
	import { enhance } from '$app/forms';

	import Button from '$lib/building_blocks/Button.svelte';

	import { mode, toggle_popup, toggle_toast } from '$lib/store/store';
	import { writable, type Writable } from 'svelte/store';
	import Default from './add_sticky_templates/Default.svelte';
	import List from './add_sticky_templates/List.svelte';
	import Password from './add_sticky_templates/Password.svelte';
	import Recipe from './add_sticky_templates/Recipe.svelte';
	import Markdown from './add_sticky_templates/Markdown.svelte';
	import Files from './add_sticky_templates/Files.svelte';
	import ButtonGroup from './add_sticky_templates/ButtonGroup.svelte';

	let title: string = '';

	let textarea: HTMLTextAreaElement;
	let button_selected = 'Default';
	let is_private = false;

	let num_list_items = 1;
	let list_items: string[] = [];
	const items_increment_list: Writable<{ id: number; value: string }[]> = writable([
		{ id: 0, value: '' }
	]);
	let list: { id: number; value: string }[] = [];
	items_increment_list.subscribe((curr) => {
		list = curr;
	});

	let num_passwords = 1;
	let password_items: string[] = [];

	let num_ingredients = 1;
	let ingredient_items: string[] = [];

	let num_directions = 1;
	let directions_items: string[] = [];

	let markdown = '';

	let num_files = 1;

	let files: File[] = [];

	const handle_file_change = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			files = [...files, ...input.files];
		}
	};

	let select_folder_dropdown = false;

	let viewable = false;
	toggle_popup.subscribe(() => {
		if ($toggle_popup) {
			setTimeout(() => {
				viewable = true;
			}, 200);
		} else {
			viewable = false;
		}
	});
</script>

{#if viewable}
	<form
		class="relative -z-10 flex flex-col gap-6 w-full h-full items-start px-8 py-16 border-l {$mode
			? 'border-l-zinc-700'
			: 'border-l-gray-200'}"
		method="POST"
		enctype="multipart/form-data"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			if (button_selected == 'List') {
				list_items = [];
				for (let i = 0; i <= num_list_items; i++) {
					let curr = formData.get(`item-${i}`);
					if (!curr || typeof curr !== 'string' || curr === null) continue;
					let sanitized_list_item = curr.replace(/(\r\n|\n|\r)/gm, '');
					list_items.push(sanitized_list_item);
				}
				let sanitized_list = list_items.join('\n');

				num_list_items = 0;
				list_items = [];
				formData.set('description', sanitized_list);
			} else if (button_selected == 'Password') {
				for (let i = 0; i <= num_passwords; i++) {
					let label = formData.get(`label-${i}`);
					let username = formData.get(`username-${i}`);
					let password = formData.get(`password-${i}`);
					if (
						!label ||
						!username ||
						!password ||
						typeof username !== 'string' ||
						typeof password !== 'string' ||
						typeof label !== 'string' ||
						label === null ||
						username == null ||
						password == null
					)
						continue;
					let sanitized_label = label.trim();
					let sanitized_username = username.trim();
					let sanitized_password = password.trim();
					password_items.push(`${sanitized_label}🐐${sanitized_username}🐐${sanitized_password}`);
				}
				let sanitized_password_items = password_items.join('\n');
				num_passwords = 0;
				password_items = [];

				formData.set('description', sanitized_password_items);
			} else if (button_selected === 'Recipe') {
				for (let i = 0; i <= num_ingredients; i++) {
					let amount = formData.get(`amount-${i}`);
					let unit = formData.get(`unit-${i}`);
					let ingredient = formData.get(`ingredient-${i}`);
					if (
						!amount ||
						!unit ||
						!ingredient ||
						typeof unit !== 'string' ||
						typeof ingredient !== 'string' ||
						typeof amount !== 'string' ||
						amount === null ||
						unit == null ||
						ingredient == null
					)
						continue;
					let sanitized_amount = amount.trim();
					let sanitized_unit = unit.trim();
					let sanitized_ingredient = ingredient.trim();
					ingredient_items.push(`${sanitized_amount}🚀${sanitized_unit}🚀${sanitized_ingredient}`);
				}
				let sanitized_ingredient_items = ingredient_items.join('\n');
				num_ingredients = 0;
				ingredient_items = [];

				for (let i = 0; i <= num_directions; i++) {
					let direction = formData.get(`direction-${i}`);
					if (!direction || typeof direction !== 'string' || direction === null) continue;
					let sanitized_direction = direction.trim();

					directions_items.push(sanitized_direction);
				}
				let sanitized_direction_items = directions_items.join('\n');
				num_directions = 0;
				directions_items = [];

				formData.set('description', `${sanitized_ingredient_items}🐐${sanitized_direction_items}`);
			} else if (button_selected == 'Markdown') {
				formData.set('description', markdown);
			} else if (button_selected == 'Files') {
				files.forEach(file => formData.append('files', file, file.name));
			}
			button_selected = '';
			toggle_popup.update(() => false);
			return async ({ result, update }) => {
				await update();

				if (result.status !== 200) toggle_toast.update(() => true);
				else if (result.status !== 200) toggle_toast.update(() => true);
			};
		}}
	>
		<div class="flex justify-between items-center w-full">
			<input
				placeholder="Title"
				class="bg-inherit border-none text-3xl font-bold w-3/5 outline-none {$mode
					? 'disabled:text-white '
					: 'disabled:text-black '}"
				name="title"
				required
				id="title"
				bind:value={title}
			/>
			<div class="flex gap-2 items-center">
				<Button
					type="button"
					on:click={() => (is_private = !is_private)}
					variant={is_private ? 'destructive' : 'secondary'}
					features="font-semibold flex-shrink-0"
				>
					{#if is_private}
						Private
					{:else}
						Visible
					{/if}
				</Button>
				<!-- {#if $page.data.user.tier == 'PRO'}
					<Button variant="outline" type="button" features="font-semibold flex-shrink-0"
						>Base Folder</Button
					>
				{/if} -->
			</div>
		</div>

		<ButtonGroup bind:is_private bind:button_selected />
		{#if button_selected === 'Default'}
			<Default bind:textarea bind:is_private bind:button_selected/>
		{:else if button_selected == 'List'}
			<List bind:title bind:num_list_items bind:button_selected bind:is_private />
		{:else if button_selected == 'Password'}
			<Password bind:title bind:num_passwords bind:button_selected bind:is_private />
		{:else if button_selected == 'Sensitive'}
			<Default bind:textarea bind:is_private bind:button_selected/>
		{:else if button_selected === 'Recipe'}
			<Recipe bind:num_directions bind:num_ingredients bind:button_selected bind:is_private />
		{:else if button_selected == 'Markdown'}
			<Markdown bind:button_selected bind:is_private bind:markdown />
		{:else if button_selected == 'Files'}
			<Files bind:files bind:num_files bind:button_selected bind:is_private {handle_file_change}/>
		{/if}
	</form>
{/if}
