<script lang="ts">
	import { mode } from '$lib/store/store';
    export let features: string = ''
    export let variant: string = 'default'
</script>

{#if variant === 'default'}
<div class="relative {features} rounded-lg border {$mode ? 'text-white border-zinc-800' : 'text-black border-gray-200'} flex-shrink-0">
	<slot />
</div>
{:else if variant === 'button'}
<button on:dblclick class="relative {features} rounded-lg border {$mode ? 'text-white border-zinc-800' : 'text-black border-gray-200'} flex-shrink-0">
	<slot />
</button>
{/if}
