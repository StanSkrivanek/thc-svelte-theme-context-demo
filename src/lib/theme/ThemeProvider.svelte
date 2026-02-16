<!-- src/lib/theme/ThemeProvider.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createThemeContext } from './theme-context.svelte.js';
	import type { ResolvedTheme } from './types.js';

	interface Props {
		/** Force a specific theme (for nested overrides) */
		forceTheme?: ResolvedTheme;
		children: Snippet;
	}

	let { forceTheme, children }: Props = $props();

	// Pass forceTheme as a getter for reactivity
	const theme = createThemeContext({ forceTheme: () => forceTheme });
</script>

<!-- For nested providers, set data-theme on the wrapper -->
{#if forceTheme}
	<div class="theme-scope" data-theme={theme.mode}>
		{@render children()}
	</div>
{:else}
	{@render children()}
{/if}

<style>
	.theme-scope {
		background-color: var(--color-background);
		color: var(--color-foreground);
		border-radius: var(--radius-lg);
		overflow: hidden;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}
</style>
