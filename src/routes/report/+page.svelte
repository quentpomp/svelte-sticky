<script lang="ts">
	import { enhance } from '$app/forms';
import Button from '$lib/building_blocks/Button.svelte';
import { mode } from '$lib/store/store';
	import { onMount } from 'svelte';
	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<div
	class="md:h-full w-full gap-2 {$mode
		? 'bg-neutral-900 text-white'
		: 'bg-[#fafafa] text-black'} pt-12 px-24 pb-8 md:pt-24 md:px-24 md:pb-16"
>
    <form method='POST'  use:enhance class='flex flex-col gap-8 w-full'>
        <h1 class="text-2xl font-bold {$mode ? 'text-white' : 'text-black'}">Report A Bug</h1>
        <div class='flex flex-col gap-2 w-full'>
            <label for='title' class='text-base font-semibold'>What's going on?</label>
            <input class='input {$mode ? 'input-dark' : 'input-light'} w-full md:w-1/2 font-semibold' id='title' name='title' placeholder="Describe the bug..."/>
        </div>

        <div class='flex flex-col gap-2 w-full'>
            <label for='description' class='text-base font-semibold'>Any other details?</label>
            <textarea class='input {$mode ? 'input-dark' : 'input-light'} w-full md:w-1/2 resize-none h-44 font-semibold' id='description' name='description' placeholder="Provide any relevant details (where, how to reproduce, etc.)..."/>
        </div>
        <div>
            <Button variant='secondary' type='submit' formaction='/report?/report_bug' features='flex-shrink-0 font-semibold'>Submit Bug Report</Button>

        </div>
    </form>
</div>
