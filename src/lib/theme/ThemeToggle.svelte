<!-- src/lib/theme/ThemeToggle.svelte -->
<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { getThemeContext } from './theme-context.svelte.js';

	const theme = getThemeContext();

	let label = $derived(theme.isDark ? 'Switch to light mode' : 'Switch to dark mode');
</script>

<button type="button" onclick={() => theme.toggle()} class="theme-toggle" aria-label={label}>
	{#if theme.isDark}
		<Moon size={20} />
	{:else}
		<Sun size={20} />
	{/if}
</button>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-background);
		color: var(--color-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
			scale 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.theme-toggle:hover {
		background-color: var(--color-muted);
		border-color: var(--color-muted-foreground);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.theme-toggle:active {
		scale: 0.95;
	}
</style>
