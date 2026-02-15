<!-- src/lib/components/toast/ToastItem.svelte -->
<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import { CircleCheck, CircleX, Info, TriangleAlert, X } from 'lucide-svelte';
	import type { Toast } from './types.js';

	interface Props {
		/** Toast data */
		toast: Toast;

		/** Dismiss callback */
		ondismiss: () => void;
	}

	const { toast, ondismiss }: Props = $props();

	// Type-safe icon mapping
	const icons: Record<Toast['type'], typeof Icon> = {
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		error: CircleX
	};

	// Get the icon component for the current toast type
	const IconComponent = $derived(icons[toast.type]);
</script>

<div class="toast toast-{toast.type}" role="alert">
	<span class="toast-icon" aria-hidden="true">
		<IconComponent size={20} />
	</span>

	<p class="toast-message">
		{toast.message}
	</p>

	<button type="button" class="toast-dismiss" onclick={ondismiss} aria-label="Dismiss notification">
		<X size={18} />
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-radius: var(--radius-lg, 0.75rem);
		background: var(--color-card, #ffffff);
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--color-border);
		animation: toast-slide-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		min-width: 320px;
		max-width: 420px;
	}

	@keyframes toast-slide-in {
		from {
			opacity: 0;
			transform: translateX(100%) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	/* Type-specific styling */
	.toast-info {
		border-left: 3px solid var(--color-info, #3b82f6);
	}

	.toast-success {
		border-left: 3px solid var(--color-success, #22c55e);
	}

	.toast-warning {
		border-left: 3px solid var(--color-warning, #f59e0b);
	}

	.toast-error {
		border-left: 3px solid var(--color-error, #ef4444);
	}

	.toast-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.125rem;
	}

	.toast-info .toast-icon {
		color: var(--color-info, #3b82f6);
	}

	.toast-success .toast-icon {
		color: var(--color-success, #22c55e);
	}

	.toast-warning .toast-icon {
		color: var(--color-warning, #f59e0b);
	}

	.toast-error .toast-icon {
		color: var(--color-error, #ef4444);
	}

	.toast-message {
		flex: 1;
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5;
		color: var(--color-foreground);
		word-break: break-word;
	}

	.toast-dismiss {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
		margin-top: -0.125rem;
		margin-right: -0.25rem;
		background: transparent;
		border: none;
		border-radius: var(--radius-sm, 0.375rem);
		cursor: pointer;
		color: var(--color-muted-foreground, #64748b);
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toast-dismiss:hover {
		color: var(--color-foreground);
		background: var(--color-muted, #f1f5f9);
	}

	.toast-dismiss:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.toast-dismiss:active {
		scale: 0.95;
	}
</style>
