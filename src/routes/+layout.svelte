<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { mode } from '$lib/store/store';
	onMount(() => {
		document.body.style.backgroundColor = $mode ? 'rgb(23, 23, 23)' : '#fafafa';
	});
</script>

<slot />