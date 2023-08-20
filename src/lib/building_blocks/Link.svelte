<script lang="ts">
	export let variant: string;
	import { mode } from '$lib/store/store';
	export let features = '';
	export let href: string;
</script>

{#if variant === 'primary'}
	<a
		{href}
		class="{$mode
			? 'bg-white text-black'
			: 'bg-blue-600 text-white'} rounded-md hover:opacity-90 duration-200 text-sm px-4 py-2 {features}"
	>
		<slot />
	</a>
{:else if variant === 'secondary'}
	<a
		{href}
		class="{$mode
			? 'text-white bg-zinc-800 hover:bg-zinc-900'
			: 'text-black bg-gray-100 hover:opacity-80'} text-sm px-4 py-2 duration-200 rounded-md {features}"
	>
		<slot />
	</a>
{:else if variant === 'destructive'}
	<a
		{href}
		class="{$mode
			? 'bg-red-700 hover:bg-red-800'
			: 'bg-red-600 hover:bg-red-700'} text-sm px-4 py-2 duration-200 text-white rounded-md {features}"
	>
		<slot />
	</a>
{:else if variant === 'outline'}
	<a
		{href}
		class="text-sm px-4 py-2 {$mode
			? 'border border-zinc-800 hover:bg-zinc-800 text-white'
			: 'border border-gray-200 hover:bg-gray-100 text-black'}  duration-200 rounded-md {features}"
	>
		<slot />
	</a>
{:else if variant === 'icon'}
	<a
		{href}
		class="text-sm w-[2.375rem] aspect-square p-2 {$mode
			? 'border border-zinc-800 hover:bg-zinc-800 text-white'
			: 'border border-gray-200 hover:bg-gray-100 text-black'} duration-200 rounded-md flex justify-center items-center {features}"
	>
		<slot />
	</a>
{:else if variant === 'icon-features'}
	<a {href} class="text-sm h-[2.375rem] aspect-square duration-200 rounded-md {features}">
		<slot />
	</a>
{/if}
