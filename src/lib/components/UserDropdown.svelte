<script lang='ts'>
	import { page } from "$app/stores";


	import { mode } from "$lib/store/store";
	import FaBriefcase from "svelte-icons/fa/FaBriefcase.svelte";
	import FaFileContract from "svelte-icons/fa/FaFileContract.svelte";
	import FaRocket from "svelte-icons/fa/FaRocket.svelte";
	import MdBugReport from "svelte-icons/md/MdBugReport.svelte";
	import MdHelp from "svelte-icons/md/MdHelp.svelte";
	import MdPerson from "svelte-icons/md/MdPerson.svelte";

</script>
<div
class="flex flex-col py-2 px-2 -bottom-[10.5rem] right-0 w-48 absolute rounded-lg border {$mode
    ? 'text-white border-zinc-800 bg-neutral-900'
    : 'text-black border-gray-200 bg-[#fafafa]'}"
>
<a
    href="/settings"
    class="w-full flex justify-between items-center {$mode
        ? 'hover:bg-zinc-700'
        : 'hover:bg-zinc-200'} rounded-md p-1"
>
    <p class="text-sm font-semibold truncate">{$page.data.user.username}</p>
    {#if $page.data.user.profile_picture.length}
        <img
            class="w-5 flex-shrink-0 aspect-square rounded-md"
            src={$page.data.user.profile_picture}
            alt=""
        />
    {:else}
        <div class="w-4 flex-shrink-0 aspect-square">
            <MdPerson />
        </div>
    {/if}
</a>
<a
    href="/upgrade"
    class="w-full flex justify-between items-center {$mode
        ? 'hover:bg-zinc-700'
        : 'hover:bg-zinc-200'} rounded-md p-1"
>
    <p class="text-sm font-semibold capitalize">{$page.data.user.tier} Tier</p>
    <div class="w-4 flex-shrink-0 aspect-square">
        <FaRocket />
    </div>
</a>
<a
    href="/about"
    class="w-full flex justify-between items-center {$mode
        ? 'hover:bg-zinc-700'
        : 'hover:bg-zinc-200'} rounded-md p-1"
>
    <p class="text-sm font-semibold capitalize">About</p>
    <div class="w-4 flex-shrink-0 aspect-square">
        <MdHelp />
    </div>
</a>
<a
    href="/report"
    class="w-full flex justify-between items-center {$mode
        ? 'hover:bg-zinc-700'
        : 'hover:bg-zinc-200'} rounded-md p-1"
>
    <p class="text-sm font-semibold capitalize">Report Bug</p>
    <div class="w-4 flex-shrink-0 aspect-square">
        <MdBugReport />
    </div>
</a>
<a
    href="/tos"
    class="w-full flex justify-between items-center {$mode
        ? 'hover:bg-zinc-700'
        : 'hover:bg-zinc-200'} rounded-md p-1"
>
    <p class="text-sm font-semibold capitalize truncate">Terms of Service</p>
    <div class="w-4 flex-shrink-0 aspect-square">
        <FaFileContract />
    </div>
</a>
</div>