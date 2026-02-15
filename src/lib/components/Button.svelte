<!-- src/lib/components/Button.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		size?: 'default' | 'sm' | 'lg' | 'icon';
		children: Snippet;
		class?: string;
	}

	let {
		variant = 'default',
		size = 'default',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<button class="btn btn-{variant} btn-{size} {className}" {...rest}>
	{@render children()}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		white-space: nowrap;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1;
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		border: 1px solid transparent;
	}

	.btn:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.btn:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.btn:active:not(:disabled) {
		scale: 0.98;
	}

	/* Variants */
	.btn-default {
		background: var(--color-primary);
		color: var(--color-primary-foreground);
		box-shadow: var(--shadow-sm);
	}

	.btn-default:hover:not(:disabled) {
		background: var(--color-primary-hover, var(--color-primary));
		filter: brightness(0.9);
	}

	.btn-destructive {
		background: var(--color-destructive);
		color: var(--color-destructive-foreground);
		box-shadow: var(--shadow-sm);
	}

	.btn-destructive:hover:not(:disabled) {
		filter: brightness(0.9);
	}

	.btn-outline {
		border-color: var(--color-input);
		background: var(--color-background);
		color: var(--color-foreground);
	}

	.btn-outline:hover:not(:disabled) {
		background: var(--color-accent);
		color: var(--color-accent-foreground);
	}

	.btn-secondary {
		background: var(--color-secondary);
		color: var(--color-secondary-foreground);
	}

	.btn-secondary:hover:not(:disabled) {
		filter: brightness(0.95);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-foreground);
	}

	.btn-ghost:hover:not(:disabled) {
		background: var(--color-accent);
		color: var(--color-accent-foreground);
	}

	.btn-link {
		background: transparent;
		color: var(--color-primary);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.btn-link:hover:not(:disabled) {
		text-decoration: none;
	}

	/* Sizes */
	.btn-default.btn-default {
		height: 2.5rem;
		padding: 0 1rem;
	}

	.btn-sm {
		height: 2rem;
		padding: 0 0.75rem;
		font-size: 0.8125rem;
		border-radius: var(--radius-sm);
	}

	.btn-lg {
		height: 2.75rem;
		padding: 0 2rem;
		font-size: 0.9375rem;
	}

	.btn-icon {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0;
	}

	.btn-icon.btn-sm {
		width: 2rem;
		height: 2rem;
	}

	.btn-icon.btn-lg {
		width: 2.75rem;
		height: 2.75rem;
	}
</style>
