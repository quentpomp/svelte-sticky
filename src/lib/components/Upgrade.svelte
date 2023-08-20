<script lang='ts'>
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Button from "$lib/building_blocks/Button.svelte";
	import Card from "$lib/building_blocks/Card.svelte";


	import { mode } from "$lib/store/store";
	import FaStickyNote from "svelte-icons/fa/FaStickyNote.svelte";

    let free_features = [
        'E2E Data Encryption',
        'Two Note Layouts',
        'Limited Note Capacity (20)'
    ]

    let pro_features = [
        'E2E Data Encryption',
        '6+ Robust Note Layouts',
        'Unlimited Stickies, File Upload, & Storage',
        'Note Sharing and Collaboration (Coming soon)',
        'Smart Tags & AI Suggestions (coming soon)',
        'Cross-Platform Support (coming soon)',
        'Advanced Organization & Tagging (coming soon)',
        'Custom Themes & Styling (coming soon)',
        'Analytics & Insights (coming soon)',
        'Import/Export Options (coming soon)',
        'Offline Access (coming soon)',
        'Priority Customer Support',
    ]
</script>
<div
	class="w-full h-full relative flex flex-col items-center gap-4 px-1 bg-inherit {$mode
		? 'text-white'
		: 'text-black'}"
>
	<div
		class="{$mode
			? 'bg-neutral-900'
			: 'bg-[#fafafa]'}  z-10 py-2 sticky top-0 left-0 w-full flex items-center justify-between"
	>
		<h1 class="text-2xl font-bold">Upgrade to Pro</h1>
	</div>

    <div class='w-full flex flex-col md:flex-row items-start justify-center gap-2'>
        <Card features='w-full p-8 md:w-[24rem] flex flex-col gap-2 items-start font-semibold text-sm'>
            <h2 class='w-full text-center text-2xl font-bold'>Free</h2>
            <p>{" "}</p>
            {#each free_features as feature}
                <div class='flex gap-4 items-center'>
                    <div class='w-4 h-4 flex justify-center items-center {$mode ? "text-orange-300" : 'text-orange-500'}'>
                        <FaStickyNote />
                    </div>
                    <p>{feature}</p>
                </div>
            {/each}
            <p>{" "}</p>
            {#if $page.data.user.tier === 'PRO'}
            <form method='POST' use:enhance class='w-full flex items-center justify-end'>
                <Button formaction="/upgrade?/downgrade" type='submit' variant='primary'>Downgrade</Button>
            </form>
            {/if}
        </Card>
    
        <Card features='w-full p-8 md:w-[24rem] flex flex-col gap-2 items-start font-semibold text-sm'>
            <h2 class='w-full text-center text-2xl font-bold'>Pro</h2>
            <p>{" "}</p>
            {#each pro_features as feature}
                <div class='flex gap-4 items-center'>
                    <div class='w-4 h-4 flex justify-center items-center {$mode ? "text-yellow-200" : 'text-yellow-400'}'>
                        <FaStickyNote />
                    </div>
                    <p>{feature}</p>
                </div>
            {/each}
            <p>{" "}</p>
            {#if $page.data.user.tier === 'FREE'}
            <form method='POST' use:enhance class='w-full flex items-center justify-end'>
                <!-- test -->
                <!-- <input type="hidden" name="price_id" id='price_id' value="price_1NaKe5GiQ416YsHZ4urSGtnU" />  -->
                <!-- real -->
                <input type="hidden" name="price_id" id='price_id' value="price_1Na5JZGiQ416YsHZ5xPu8Ak1" />

                <Button formaction="/upgrade?/stripe_checkout_session" type='submit' variant='primary'>Upgrade</Button>
            </form>
            {/if}
        </Card>
    </div>
    

</div>
