<script lang="ts">
	import Button from "$lib/building_blocks/Button.svelte";
	import { current_folder_id, mode } from "$lib/store/store";
	import MdAdd from "svelte-icons/md/MdAdd.svelte";
	import MdFileUpload from "svelte-icons/md/MdFileUpload.svelte";

    export let num_files: number;
    export let files: File[];
    export let handle_file_change: (e: Event) => void;
    export let button_selected: string;
    export let is_private: boolean;
</script>

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