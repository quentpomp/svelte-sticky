<script lang='ts'>
	import Button from "$lib/building_blocks/Button.svelte";
	import { current_folder_id } from "$lib/store/store";
	import MdDelete from "svelte-icons/md/MdDelete.svelte";
	import MdPlaylistAdd from "svelte-icons/md/MdPlaylistAdd.svelte";

    export let title: string;
    export let num_passwords: number;
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