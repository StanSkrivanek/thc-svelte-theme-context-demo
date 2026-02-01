<!-- src/lib/theme/ThemeProvider.svelte -->
<script lang="ts">
	import { createThemeContext } from './theme-context.svelte.ts'
	import type { ResolvedTheme } from './types'

	interface Props {
		/** Force a specific theme (for local overrides) */
		forceTheme?: ResolvedTheme
		/** Custom storage key for localStorage */
		storageKey?: string
		children: import('svelte').Snippet
	}

	let { forceTheme, storageKey, children }: Props = $props()

	// Initialize the theme context
	let theme = createThemeContext({
		get forceTheme() { return forceTheme },
		get storageKey() { return storageKey }
	})
</script>

<div class="theme-provider" data-theme={theme.mode}>
	{@render children()}
</div>

<style>
	.theme-provider {
		/* Full viewport coverage for root usage */
		min-height: 100%;

		/* Apply theme colors */
		background-color: var(--color-background);
		color: var(--color-foreground);

		/* Smooth transitions between themes */
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
</style>