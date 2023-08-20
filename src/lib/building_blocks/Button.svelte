<script lang="ts">
	export let variant: string;
	import { mode } from '$lib/store/store';
	export let features = '';
    export let formaction = '';
    export let type: "button" | "submit" | "reset" = 'submit';
	export let id = ''
</script>

{#if variant === 'primary'}
	<button
		on:click
        {formaction}
        {type}
		{id}
		class="{$mode
			? 'bg-white text-black'
			: 'bg-blue-600 text-white'} rounded-md hover:opacity-90 duration-200 text-sm px-4 py-2 {features}"
	>
		<slot />
	</button>
{:else if variant === 'secondary'}
	<button
		on:click
        {formaction}
        {type}
		{id}
		class="{$mode
			? 'text-white bg-zinc-800 hover:bg-zinc-900'
			: 'text-black bg-gray-100 hover:opacity-80'} border border-transparent text-sm px-4 py-2 duration-200 rounded-md {features}"
	>
		<slot />
	</button>
{:else if variant === 'destructive'}
	<button
		on:click
        {type}
		{id}
		class="{$mode
			? 'bg-red-700 hover:bg-red-800'
			: 'bg-red-600 hover:bg-red-700'} text-sm px-4 py-2 duration-200 text-white rounded-md {features}"
	>
		<slot />
	</button>
{:else if variant === 'outline'}
	<button
		on:click
        {type}
        {formaction}
		{id}
		class="text-sm px-4 py-2 {$mode
			? 'border border-zinc-800 hover:bg-zinc-800 text-white'
			: 'border border-gray-200 hover:bg-gray-100 text-black'}  duration-200 rounded-md {features}"
	>
		<slot />
	</button>
{:else if variant === 'icon'}
	<button
		on:click
        {type}
        {formaction}
		{id}
		class="text-sm w-[2.375rem] h-[2.375rem] p-2 {$mode
			? 'border border-zinc-800 hover:bg-zinc-800 text-white'
			: 'border border-gray-200 hover:bg-gray-100 text-black'}  flex justify-center items-center duration-200 rounded-md {features}"
	>
		<slot />
	</button>
{:else if variant === 'icon-features'}
	<button
		on:click
        {formaction}
        {type}
		{id}
		class="text-sm h-[2.375rem] aspect-square duration-200 rounded-md {features}"
	>
		<slot />
	</button>
{/if}
