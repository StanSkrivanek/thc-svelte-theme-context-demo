<!-- src/lib/theme/ThemeSelector.svelte -->
<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import { Monitor, Moon, Sun } from 'lucide-svelte';
	import { getThemeContext } from './theme-context.svelte.js';
	import type { ThemePreference } from './types.js';

	const theme = getThemeContext();

	const options: { value: ThemePreference; label: string; icon: typeof Icon }[] = [
		{ value: 'light', label: 'Light', icon: Sun },
		{ value: 'dark', label: 'Dark', icon: Moon },
		{ value: 'system', label: 'System', icon: Monitor }
	];
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
			<span class="icon"><option.icon size={16} /></span>
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
		gap: 0.25rem;
		padding: 0.25rem;
		border-radius: var(--radius-md);
		background: var(--color-muted);
		border: 1px solid var(--color-border);
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 0.15s cubic-bezier(0.4, 0, 0.2, 1),
			color 0.15s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.option:hover:not(.selected) {
		background: var(--color-muted);
		color: var(--color-foreground);
	}

	.option:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.option.selected {
		background: var(--color-background);
		color: var(--color-foreground);
		box-shadow: var(--shadow-sm);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
