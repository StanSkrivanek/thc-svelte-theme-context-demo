<script lang="ts">
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<ThemeProvider>
	{@render children()}
</ThemeProvider>
