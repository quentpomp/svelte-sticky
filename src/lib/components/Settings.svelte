<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/building_blocks/Button.svelte';
	import Link from '$lib/building_blocks/Link.svelte';
	import { mode } from '$lib/store/store';
	import MdRemove from 'svelte-icons/md/MdRemove.svelte';
	export let user: {
		id: number;
		username: string;
		first_name: string;
		last_name: string;
		email: string;
		password_hash: string;
		is_verified: boolean;
		created_at: Date;
		tier: string;
		role: string;
		profile_picture: string;
		last_login_at: Date;
		is_active: boolean;
		encryption_key: string;
	};
	let form: HTMLFormElement;

	let uploaded_profile_pic: boolean = false;
	let updating = false;
	let delete_profile_pic = false;

	let toggle_delete_account = false;
</script>

{#if toggle_delete_account}
<div
	class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center flex-col gap-4 z-50 backdrop-blur-lg "
>

	<div
		class="w-96 spect-square rounded-md border {$mode
			? 'bg-neutral-900 border-zinc-800 text-white'
			: 'bg-[#fafafa] border-gray-200 text-black'} flex flex-col justify-center gap-4 px-4 py-4"
	>
	<h1 class="text-3xl font-bold text-center">Delete Account</h1>

		<p class="font-semibold text-sm whitespace-normal">
			Are you absolutely sure you would like to delete your account? This action is
			irreversible, and you will lose all data associated with your account.
		</p>
		<div class='flex justify-center items-center gap-2'>
			<Button variant='primary' features='font-semibold' on:click={() => toggle_delete_account = false}>Nevermind</Button>
			<form method='POST' use:enhance action='/auth?/delete_account'>
				<Button variant='destructive' features='font-semibold' type='submit'>Delete Account</Button>
			</form>
		</div>
	</div>
</div>
{/if}

<div
	class="w-full h-full flex flex-col gap-4 bg-inherit {$mode
		? 'text-white'
		: 'text-black'} overflow-y-scroll no-scrollbar"
>

	<div
		class="{$mode
			? 'bg-neutral-900'
			: 'bg-[#fafafa]'} z-10 sticky top-0 left-0 w-full flex items-center justify-between"
	>
		<h1 class="text-2xl font-bold">Settings</h1>
	</div>
	<form
		method="POST"
		enctype="multipart/form-data"
		bind:this={form}
		use:enhance={(formData) => {
			updating = true;
			return async ({ result, update }) => {
				await update();
				updating = false;
			};
		}}
		class="flex flex-col gap-5 p-4 relative h-full"
	>
		<div class="flex">
			<label
				for="profile_picture"
				class="w-40 aspect-square rounded-full flex justify-center items-center group/profile-pic relative {$mode
					? $page.data.user.tier == 'FREE'
						? 'border-2 border-zinc-700'
						: 'border-4 border-blue-500'
					: $page.data.user.tier == 'FREE'
					? 'border-2 border-gray-200'
					: 'border-4 border-blue-500'} overflow-hidden cursor-pointer"
			>
				<img
					src={user.profile_picture}
					alt={user.username}
					id="current_profile_picture"
					class="absolute object-cover w-40 h-40 rounded-full flex-shrink-0 {user.profile_picture ||
					uploaded_profile_pic
						? ''
						: 'invisible'}"
				/>
				<p
					class="absolute text-7xl capitalize font-bold {user.profile_picture ||
					uploaded_profile_pic
						? 'invisible'
						: ''}"
				>
					{user.username[0]}
				</p>

				<input
					class="hidden"
					type="file"
					id="profile_picture"
					name="profile_picture"
					accept="image/*"
					formaction="/settings?/update_user"
					on:change={() => {
						let submit_button = document.getElementById('submit_button');
						form.requestSubmit(submit_button);
					}}
				/>
			</label>
			<button
				type="button"
				on:click={() => {
					user.profile_picture = '';
					uploaded_profile_pic = false;
					delete_profile_pic = true;
				}}
				class="{uploaded_profile_pic || user.profile_picture.length == 0
					? 'hidden'
					: 'flex justify-center items-center'} z-10 w-8 h-8 p-1 rounded-md flex-shrink-0 hover:bg-red-500 {$mode
					? 'border border-zinc-800 text-white'
					: 'border border-gray-200 text-black'}"
			>
				<input
					type="hidden"
					bind:value={delete_profile_pic}
					id="delete_profile_pic"
					name="delete_profile_pic"
				/>
				<MdRemove />
			</button>
		</div>

		<div class="flex items-center justify-between w-72">
			<label for="first_name" class="text-xs font-semibold">First Name</label>
			<input
				class="input {$mode ? 'input-dark' : 'input-light'} w-48 font-semibold"
				name="first_name"
				id="first_name"
				bind:value={user.first_name}
			/>
		</div>
		<div class="flex items-center justify-between w-72">
			<label for="last_name" class="text-xs font-semibold">Last Name</label>
			<input
				class="input {$mode ? 'input-dark' : 'input-light'} w-48 font-semibold"
				name="last_name"
				id="last_name"
				bind:value={user.last_name}
			/>
		</div>
		<div class="flex justify-between items-center w-72 relative">
			<label for="username" class="text-xs font-semibold">Username</label>
			<input
				class="input {$mode ? 'input-dark' : 'input-light'} w-48 font-semibold"
				name="username"
				id="username"
				bind:value={user.username}
			/>
			{#if $page.form?.user}
				<p class="absolute text-red-500 text-xs font-semibold -right-40">Username already taken.</p>
			{/if}
		</div>
		<div class="flex justify-between items-center w-72 relative">
			<label for="email" class="text-xs font-semibold">Email</label>
			<input
				class="input {$mode ? 'input-dark' : 'input-light'} w-48 font-semibold"
				name="email"
				id="email"
				bind:value={user.email}
			/>
		</div>
		{#if !user.email.length}
			<div class="text-xs font-semibold {$mode ? 'text-zinc-700' : 'text-zinc-800'} break-keep">
				If you don't provide your email, you won't be able to recover your account if you forget
				your password.
			</div>
		{/if}

		<div class="flex gap-2 items-center">
			<Button
				variant="secondary"
				formaction="/settings?/update_user"
				type="submit"
				id="submit_button"
				features="flex-shrink-0 font-semibold flex gap-2 items-center"
			>
				{#if updating}
					<p>Updating</p>
					<div
						class="w-5 h-5 border-2 {$mode
							? 'border-t-zinc-700 border-zinc-500'
							: 'border-t-gray-200 border-gray-100'} animate-spin rounded-full"
					/>
				{:else}
					Update Profile
				{/if}
			</Button>
			{#if $page.data.user.tier == 'FREE'}
				<div>
					<Link href="/upgrade" variant="primary" features="font-semibold">Upgrade to Pro</Link>
				</div>
			{:else}
				<div>
					<Link href="/upgrade" variant="primary" features="font-semibold">Cancel Subscription</Link
					>
				</div>
			{/if}
		</div>
		<div>
			<Button
				variant="destructive"
				type="button"
				features="font-semibold"
				on:click={() => {
					toggle_delete_account = true;
				}}>Delete Account</Button
			>
		</div>
	</form>
</div>
