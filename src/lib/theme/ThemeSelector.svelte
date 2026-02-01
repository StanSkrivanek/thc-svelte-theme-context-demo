<!-- src/lib/theme/ThemeSelector.svelte -->
<script lang="ts">
	import { getThemeContext } from './theme-context.svelte.ts'
	import type { ThemePreference } from './types'

	const theme = getThemeContext()

	interface Option {
		value: ThemePreference
		label: string
		icon: string
	}

	const options: Option[] = [
		{ value: 'light', label: 'Light', icon: '☀️' },
		{ value: 'dark', label: 'Dark', icon: '🌙' },
		{ value: 'system', label: 'System', icon: '💻' }
	]
</script>

<fieldset class="theme-selector" role="radiogroup" aria-label="Theme selection">
	<legend class="sr-only">Choose theme</legend>

	{#each options as option (option.value)}
		{@const isSelected = theme.preference === option.value}

		<label class="option" class:selected={isSelected}>
			<input
				type="radio"
				name="theme"
				value={option.value}
				checked={isSelected}
				onchange={() => theme.setPreference(option.value)}
				class="sr-only"
			/>
			<span class="icon" aria-hidden="true">{option.icon}</span>
			<span class="label">{option.label}</span>
		</label>
	{/each}
</fieldset>

<!-- {#if theme.isSystemPreference}
	<p class="system-note">
		Currently using <strong>{theme.mode}</strong> based on system settings.
	</p>
{/if} -->

<style>
	.theme-selector {
		display: flex;
		gap: 0.5rem;
		padding: 0.375rem;
		margin: 0;
		border: 1px solid var(--color-border);
		border-radius: 12px;
		background-color: var(--color-surface);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		user-select: none;
		transition: all 0.2s ease;
	}

	.option:hover:not(.selected) {
		background-color: var(--color-surface-hover);
	}

	.option.selected {
		background-color: var(--color-background);
		box-shadow: 0 1px 3px var(--color-shadow);
	}

	.option:has(input:focus-visible) {
		outline: 2px solid var(--color-border-focus);
		outline-offset: 2px;
	}

	.icon {
		font-size: 1.125rem;
		line-height: 1;
	}

	.label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-foreground);
	}

	.system-note {
		margin-top: 0.75rem;
		font-size: 0.75rem;
		color: var(--color-foreground-muted);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>