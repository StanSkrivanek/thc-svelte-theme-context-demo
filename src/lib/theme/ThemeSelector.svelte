<!-- src/lib/theme/ThemeSelector.svelte -->
<script lang="ts">
	import { getThemeContext } from './theme-context.svelte.js'
	import type { ThemePreference } from './types.js'

	const theme = getThemeContext()

	const options: { value: ThemePreference; label: string; icon: string }[] = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'system', label: 'System', icon: '💻' }
	]
</script>

<div class="theme-selector" role="radiogroup" aria-label="Theme selection">
	{#each options as option (option.value)}
		<button
			type="button"
			role="radio"
			aria-checked={theme.preference === option.value}
			class="option"
			class:selected={theme.preference === option.value}
			onclick={() => theme.setPreference(option.value)}
		>
			<span class="icon">{option.icon}</span>
			<span class="label">{option.label}</span>
		</button>
	{/each}
</div>

<!-- {#if theme.isSystem}
	<p class="system-note">
		Currently using <strong>{theme.mode}</strong> based on system settings.
	</p>
{/if} -->

<style>
	.theme-selector {
		display: inline-flex;
		gap: 4px;
		padding: 4px;
		border-radius: 12px;
		background: var(--color-surface);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		border: none;
		border-radius: 8px;
		background: transparent;
		color: var(--color-foreground);
		font-size: 14px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.option:hover:not(.selected) {
		background: var(--color-surface-hover);
	}

	.option.selected {
		background: var(--color-background);
		box-shadow: 0 1px 3px var(--color-shadow);
	}

	.icon { font-size: 16px; }

	.system-note {
		margin-top: 8px;
		font-size: 12px;
		color: var(--color-foreground-muted);
	}
</style>