<script lang="ts">
	import Settings from '$lib/components/Settings.svelte';
	import { mode } from '$lib/store/store';
	import { onMount } from 'svelte';
	export let data: {
		user: {
			id: number;
			username: string;
			first_name: string;
			last_name: string;
			email: string;
			password_hash: string;
			is_verified: boolean;
			created_at: Date;
			tier: string;
			role: string;
			profile_picture: string;
			last_login_at: Date;
			is_active: boolean;
			encryption_key: string;
		};
	};

    onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<div
	class="h-full w-full display flex justify-center flex-wrap items-center gap-2 {$mode
		? 'bg-neutral-900'
		: 'bg-[#fafafa]'} pt-12 px-12 pb-8 md:pt-24 md:px-24 md:pb-16"
>
	<Settings user={data.user}/>
</div>
