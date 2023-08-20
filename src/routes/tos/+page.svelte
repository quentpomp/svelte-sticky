<script lang='ts'>
	import Button from "$lib/building_blocks/Button.svelte";


	import { mode } from "$lib/store/store";
	import { onMount } from "svelte";
	import FaMoon from "svelte-icons/fa/FaMoon.svelte";
	import MdWbSunny from "svelte-icons/md/MdWbSunny.svelte";
	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<div class="fixed top-2 right-2">
	<Button variant="icon" on:click={() => mode.set(Math.abs($mode - 1))}>
		{#if $mode}
			<MdWbSunny />
		{:else}
			<FaMoon />
		{/if}
	</Button>
</div>

<div
	class="md:h-full w-full gap-2 {$mode
		? 'bg-neutral-900 text-white'
		: 'bg-[#fafafa] text-black'} pt-12 px-24 pb-8 md:pt-24 md:px-24 md:pb-16"
>
<div >
	<h1 class="text-3xl font-bold mb-4">Sticky Terms of Service</h1>

	<p class="mb-4">
		Please read these Terms of Service ("Terms", "Terms of Service") carefully before using our website (the "Service").
	</p>

	<p class="mb-4">
		Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
	</p>

	<h2 class="text-xl font-semibold mb-2">1. Account Registration</h2>
	<p class="mb-4">
		To access certain features of the Service, you may be required to create an account. You agree to provide accurate and complete information when creating an account and to keep your account information updated.
	</p>

	<h2 class="text-xl font-semibold mb-2">2. User Conduct</h2>
	<p class="mb-4">
		You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Service's operation. You also agree not to engage in any activity that interferes with or disrupts the Service or its servers.
	</p>

	<h2 class="text-xl font-semibold mb-2">3. Intellectual Property</h2>
	<p class="mb-4">
		The content provided through the Service is protected by copyright, trademarks, and other intellectual property rights. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
	</p>

	<h2 class="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
	<p class="mb-4">
		We shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising out of or in connection with your use of the Service, even if we have been advised of the possibility of such damages.
	</p>

	<h2 class="text-xl font-semibold mb-2">5. Governing Law</h2>
	<p class="mb-4">
		These Terms shall be governed and construed in accordance with the laws of your country, without regard to its conflict of law provisions.
	</p>

	<h2 class="text-xl font-semibold mb-2">6. Changes</h2>
	<p class="mb-4">
		We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is a material, we will try to provide at least 30 days' notice before any new terms taking effect.
	</p>

	<h2 class="text-xl font-semibold mb-2">7. Contact Us</h2>
	<p>If you have any questions about these Terms, please contact us.</p>
</div>
</div>
