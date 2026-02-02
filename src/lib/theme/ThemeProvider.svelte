<!-- src/lib/theme/ThemeProvider.svelte -->
<script lang="ts">
	import { createThemeContext } from './theme-context.svelte.js'
	import type { ResolvedTheme } from './types.js'
	import type { Snippet } from 'svelte'

	interface Props {
		/** Force a specific theme (for nested overrides) */
		forceTheme?: ResolvedTheme
		children: Snippet
	}

	let { forceTheme, children }: Props = $props()

	const theme = createThemeContext({ forceTheme })
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
		transition: background-color 0.3s ease, color 0.3s ease;
	}
</style>