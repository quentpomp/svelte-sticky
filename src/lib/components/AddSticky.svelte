<script lang="ts">
	import { enhance } from '$app/forms';

	import { marked } from 'marked';

	import Button from '$lib/building_blocks/Button.svelte';
	import MdPlaylistAdd from 'svelte-icons/md/MdPlaylistAdd.svelte';
	import FaUtensilSpoon from 'svelte-icons/fa/FaUtensilSpoon.svelte';
	import FaLemon from 'svelte-icons/fa/FaLemon.svelte';
	import FaStickyNote from 'svelte-icons/fa/FaStickyNote.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import MdFileUpload from 'svelte-icons/md/MdFileUpload.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';

	import { current_folder_id, mode, toggle_popup, toggle_toast } from '$lib/store/store';
	import { page } from '$app/stores';
	import { writable, type Writable } from 'svelte/store';

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

	// Add files to the stack when the input changes
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

		<div class="flex flex-wrap items-center gap-2">
			<Button
				on:click={() => {
					is_private = false;
					button_selected = 'Default';
				}}
				type="button"
				variant="outline"
				features="font-semibold {button_selected == 'Default'
					? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
					: ''}">Default</Button
			>
			<Button
				on:click={() => {
					is_private = false;
					button_selected = 'List';
				}}
				type="button"
				variant="outline"
				features="font-semibold {button_selected == 'List'
					? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
					: ''}">List</Button
			>

			{#if $page.data.user.tier == 'PRO'}
				<Button
					on:click={() => {
						is_private = true;
						button_selected = 'Password';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Password'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Password</Button
				>
				<Button
					on:click={() => {
						is_private = true;
						button_selected = 'Sensitive';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Sensitive'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Sensitive</Button
				>
				<Button
					on:click={() => {
						is_private = false;
						button_selected = 'Recipe';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Recipe'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Recipe</Button
				>
				<Button
					on:click={() => {
						is_private = false;
						button_selected = 'Markdown';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Markdown'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Markdown</Button
				>
				<!-- <Button
					on:click={() => {
						is_private = false;
						button_selected = 'Draft';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Draft'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Draft</Button
				> -->
				<!-- <Button
					on:click={() => {
						is_private = false;
						button_selected = 'Files';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Files'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Files</Button
				> -->
				<!-- <Button
					on:click={() => {
						is_private = false;
						button_selected = 'Workout';
					}}
					type="button"
					variant="outline"
					features="font-semibold {button_selected == 'Workout'
						? `${$mode ? 'bg-zinc-800' : 'bg-gray-300'}`
						: ''}">Workout</Button
				> -->
			{/if}
		</div>
		{#if button_selected === 'Default'}
			<textarea
				placeholder="Description"
				bind:this={textarea}
				on:input={() => {
					textarea.style.height = '';
					textarea.style.height = textarea.scrollHeight + 'px';
				}}
				class="resize-none bg-inherit border border-none outline-none font-semibold text-base py-2 px-0 w-full h-full {$mode
					? 'text-zinc-400 disabled:text-zinc-400 '
					: 'text-zinc-700 disabled:text-zinc-700'}"
				name="description"
				id="description"
			/>
			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected == 'List'}
			<div class="w-full h-full flex-col gap-3 overflow-scroll relative">
				<div class="flex items-center justify-between mb-1">
					<p class="font-semibold">{title}</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => {
							num_list_items += 1;
						}}
					>
						<MdPlaylistAdd />
					</Button>
				</div>

				{#each { length: num_list_items } as _, i}
					<div class="flex gap-2 items-center justify-between relative mb-1" id={`container-${i}`}>
						{#key i}
							<div class="flex gap-2 items-center w-5/6">
								<div class="w-3 h-3 flex items-center justify-center flex-shrink-0">
									<FaStickyNote />
								</div>
								<input
									placeholder="Item"
									id="item-{i}"
									name="item-{i}"
									class="bg-inherit border-none font-semibold text-base outline-none w-full my-1"
								/>
							</div>

							<Button
								type="button"
								variant="icon"
								features="duration-200"
								on:click={() => {
									const container = document.getElementById(`container-${i}`);
									container?.remove();
								}}
							>
								<MdDelete />
							</Button>
						{/key}
					</div>
				{/each}
			</div>

			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />

			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected == 'Password'}
			<div class="w-full h-full flex-col gap-3 overflow-scroll relative">
				<div class="flex items-center justify-between mb-1">
					<p class="font-semibold">{title}</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => {
							num_passwords += 1;
						}}
					>
						<MdPlaylistAdd />
					</Button>
				</div>
				{#each { length: num_passwords } as _, i}
					{#key i}
						<div
							class="flex gap-2 items-center justify-between py-2 relative"
							id={`container-${i}`}
						>
							<div class="flex items-center">
								<input
									placeholder="Label"
									id="label-{i}"
									name="label-{i}"
									class="bg-inherit border-none font-semibold text-sm w-1/5 outline-none"
								/>
								<input
									placeholder="Username"
									id="username-{i}"
									name="username-{i}"
									class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
								/>
								<input
									placeholder="Password"
									id="password-{i}"
									name="password-{i}"
									class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
								/>
							</div>

							<Button
								type="button"
								variant="icon"
								features="duration-200"
								on:click={() => {
									const container = document.getElementById(`container-${i}`);
									container?.remove();
								}}
							>
								<MdDelete />
							</Button>
						</div>
					{/key}
				{/each}
			</div>
			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected == 'Sensitive'}
			<textarea
				placeholder="Description"
				bind:this={textarea}
				on:input={() => {
					textarea.style.height = '';
					textarea.style.height = textarea.scrollHeight + 'px';
				}}
				class="resize-none bg-inherit border border-none outline-none font-semibold text-base py-2 px-0 w-full h-full {$mode
					? 'text-zinc-400 disabled:text-zinc-400 '
					: 'text-zinc-700 disabled:text-zinc-700'}"
				name="description"
				id="description"
			/>
			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected === 'Recipe'}
			<div class="w-full h-full flex-col gap-3 overflow-scroll relative">
				<div class="font-semibold text-lg flex justify-between items-center">
					<p>Ingredients</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => (num_ingredients += 1)}
					>
						<MdPlaylistAdd />
					</Button>
				</div>
				{#each { length: num_ingredients } as _, i}
					<div class="flex gap-2 items-center py-2 relative">
						<div class="w-3 h-3 flex items-center justify-center text-yellow-400">
							<FaLemon />
						</div>
						<input
							placeholder="Amount"
							id="amount-{i}"
							name="amount-{i}"
							class="bg-inherit border-none font-semibold text-sm w-1/5 outline-none"
						/>
						<input
							placeholder="Unit"
							id="unit-{i}"
							name="unit-{i}"
							class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
						/>
						<input
							placeholder="Ingredient"
							id="ingredient-{i}"
							name="ingredient-{i}"
							class="bg-inherit border-none font-semibold text-sm w-1/4 outline-none"
						/>
						<Button
							type="button"
							variant="icon"
							features="duration-200 absolute right-0 hover:text-red-600"
						>
							<MdDelete />
						</Button>
					</div>
				{/each}
				<div class="h-10" />
				<div class="font-semibold text-lg flex justify-between items-center">
					<p>Directions</p>
					<Button
						variant="icon"
						type="button"
						features="flex-shrink-0"
						on:click={() => (num_directions += 1)}
					>
						<MdPlaylistAdd />
					</Button>
				</div>

				{#each { length: num_directions } as _, i}
					<div class="flex gap-2 items-center py-2 relative">
						<div class="w-3 h-3 flex items-center justify-center text-blue-500">
							<FaUtensilSpoon />
						</div>
						<input
							placeholder="Direction"
							id="direction-{i}"
							name="direction-{i}"
							class="bg-inherit border-none font-semibold text-sm w-3/4 outline-none"
						/>
						<Button
							type="button"
							variant="icon"
							features="duration-200 absolute right-0 hover:text-red-600"
						>
							<MdDelete />
						</Button>
					</div>
				{/each}
			</div>
			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected == 'Markdown'}
			<div class="w-full h-full flex flex-col gap-1 overflow-scroll">
				<textarea
					placeholder="Write your markdown here..."
					class="resize-none bg-inherit border-none outline-none font-semibold text-base py-2 px-0 w-full h-1/2 {$mode
						? 'text-zinc-400 disabled:text-zinc-400 '
						: 'text-zinc-700 disabled:text-zinc-700'}"
					bind:value={markdown}
				/>
				<div class="w-full block h-1/2 overflow-scroll font-semibold prose-sm">
					{@html marked(markdown)}
				</div>
			</div>

			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{:else if button_selected == 'Files'}
			<div class="w-full relative flex flex-col gap-1">
				<Button
					variant="icon"
					type="button"
					features="absolute top-0 right-0"
					on:click={() => (num_files += 1)}
				>
					<MdAdd />
				</Button>
				{#each { length: num_files } as _, i}
					<label
						for="file-{i}"
						class="text-sm h-[2.375rem] w-[2.375rem] p-2 {$mode
							? 'border border-zinc-800 hover:bg-zinc-800 text-white'
							: 'border border-gray-200 hover:bg-gray-100 text-black'}  duration-200 rounded-md flex-shrink-0 {files[i] ? 'bg-green-500' : ''}"
					>
						<MdFileUpload />

						<input type="file" id="file-{i}" name="file-{i}" class="hidden" on:change={handle_file_change}/>
					</label>
				{/each}
			</div>

			<input type="hidden" bind:value={button_selected} id="type" name="type" />
			<input type="hidden" value=" " id="description" name="description" />

			<input type="hidden" bind:value={is_private} id="is_private" name="is_private" />
			<input type="hidden" id="folder_id" name="folder_id" bind:value={$current_folder_id} />
			<Button
				variant="primary"
				formaction="/stickies?/add_sticky"
				type="submit"
				features="font-semibold absolute bottom-4 right-8">Create</Button
			>
		{/if}
	</form>
{/if}
