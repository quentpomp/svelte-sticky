<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/building_blocks/Button.svelte';
	import Card from '$lib/building_blocks/Card.svelte';
	import { mode } from '$lib/store/store';
	import { onMount } from 'svelte';
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import MdWbSunny from 'svelte-icons/md/MdWbSunny.svelte';

	export let form;

	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<div class="fixed top-2 right-2">
	<Button variant="icon" on:click={() => mode.set(Math.abs($mode - 1))}>
		{#if $mode}
			<MdWbSunny />
		{:else}
			<FaMoon />
		{/if}
	</Button>
</div>

<form
	method="POST"
	use:enhance
	class="w-screen md:h-screen {$mode
		? 'bg-neutral-900 text-white'
		: 'bg-[#fafafa] text-black'} p-32 flex justify-center items-center"
>
	<Card features="flex flex-col gap-8 items-center p-16 border-none">
		<h1 class="text-3xl font-bold">Welcome To Sticky</h1>
		<div class="relative">
			<p
				class="absolute -top-2 left-2 px-1 text-xs font-semibold {$mode
					? 'bg-neutral-900 text-zinc-400'
					: 'bg-[#fafafa] text-blue-800'}"
			>
				Name
			</p>
			<input id="username" name="username" class="input {$mode ? 'input-dark' : 'input-light'}" />
		</div>
		<div class="relative">
			<p
				class="absolute -top-2 left-2 px-1 text-xs font-semibold {$mode
					? 'bg-neutral-900 text-zinc-400'
					: 'bg-[#fafafa] text-blue-800'}"
			>
				Password
			</p>
			<input
				id="password"
				name="password"
				type="password"
				class="input {$mode ? 'input-dark' : 'input-light'}"
			/>
		</div>
		<div class="flex gap-2 items-center">
			<Button type="submit" variant="primary" formaction="/auth?/login" features="font-semibold"
				>Login</Button
			>
			<Button
				type="submit"
				variant="secondary"
				formaction="/auth?/register"
				features="font-semibold">Register</Button
			>
		</div>
		{#if form?.invalid}
			<p class="text-red-500 text-xs font-semibold whitespace-normal">
				You missed some fields. If you want to register, just create a username and password, and
				click "Register".
			</p>
		{/if}
		{#if form?.exists}
			<p class="text-red-500 text-xs font-semibold">
				The username you entered isn't connected with an account.
			</p>
		{/if}
		{#if form?.user}
			<p class="text-red-500 text-xs font-semibold">
				There's already an account with this username.
			</p>
		{/if}
		{#if form?.credentials}
			<p class="text-red-500 text-xs font-semibold">
				The password you've entered is incorrect.{" "}<a class="underline" href="auth/forgot_password"
					>Forgot password?</a
				>
			</p>
		{/if}
	</Card>
</form>
