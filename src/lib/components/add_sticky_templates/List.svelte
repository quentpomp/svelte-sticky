<script lang='ts'>
	import Button from "$lib/building_blocks/Button.svelte";
	import { current_folder_id } from "$lib/store/store";
	import FaStickyNote from "svelte-icons/fa/FaStickyNote.svelte";
	import MdDelete from "svelte-icons/md/MdDelete.svelte";
	import MdPlaylistAdd from "svelte-icons/md/MdPlaylistAdd.svelte";

    export let title: string;
    export let num_list_items: number;
    export let button_selected: string;
    export let is_private: boolean;
    
</script>

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