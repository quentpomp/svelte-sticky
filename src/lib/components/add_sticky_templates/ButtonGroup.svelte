<script lang='ts'>
	import { page } from "$app/stores";
	import Button from "$lib/building_blocks/Button.svelte";
	import { mode } from "$lib/store/store";

    export let is_private: boolean;
    export let button_selected: string;
 
</script>

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