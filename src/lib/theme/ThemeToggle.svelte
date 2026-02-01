<!-- src/lib/theme/ThemeToggle.svelte -->
<script lang="ts">
	import { getThemeContext } from './theme-context.svelte.ts'

	const theme = getThemeContext()

	// Descriptive labels for screen readers
	let label = $derived(theme.isDark ? 'Switch to light mode' : 'Switch to dark mode')
</script>

<button type="button" onclick={theme.toggle} class="theme-toggle" aria-label={label} title={label}>
	<!-- Sun icon for light mode -->
	<svg
		class="icon sun"
		class:visible={theme.isLight}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<circle cx="12" cy="12" r="5" />
		<line x1="12" y1="1" x2="12" y2="3" />
		<line x1="12" y1="21" x2="12" y2="23" />
		<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
		<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
		<line x1="1" y1="12" x2="3" y2="12" />
		<line x1="21" y1="12" x2="23" y2="12" />
		<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
		<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
	</svg>

	<!-- Moon icon for dark mode -->
	<svg
		class="icon moon"
		class:visible={theme.isDark}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		aria-hidden="true"
	>
		<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
	</svg>
</button>

<style>
	.theme-toggle {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background-color: var(--color-surface);
		color: var(--color-foreground);
		cursor: pointer;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
	}

	.theme-toggle:hover {
		background-color: var(--color-surface-hover);
		transform: scale(1.05);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}

	.icon {
		position: absolute;
		width: 22px;
		height: 22px;
		opacity: 0;
		transform: rotate(-90deg) scale(0.5);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.icon.visible {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}
</style>