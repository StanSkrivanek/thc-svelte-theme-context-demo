<!-- src/lib/components/toast/ToastItem.svelte -->
<script lang="ts">
	import type { Toast } from './types.js'

	interface Props {
		/** Toast data */
		toast: Toast

		/** Dismiss callback */
		ondismiss: () => void
	}

	const { toast, ondismiss }: Props = $props()

	// Type-safe icon mapping
	const icons: Record<Toast['type'], string> = {
		info: 'ℹ️',
		success: '✅',
		warning: '⚠️',
		error: '❌'
	}
</script>

<div class="toast toast-{toast.type}" role="alert">
	<span class="toast-icon" aria-hidden="true">
		{icons[toast.type]}
	</span>

	<p class="toast-message">
		{toast.message}
	</p>

	<button
		type="button"
		class="toast-dismiss"
		onclick={ondismiss}
		aria-label="Dismiss notification"
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	</button>
</div>

<style>
	.toast {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 1rem;
		border-radius: 8px;
		background: var(--toast-bg, #ffffff);
		box-shadow:
			0 4px 12px rgba(0, 0, 0, 0.15),
			0 1px 3px rgba(0, 0, 0, 0.1);
		border-left: 4px solid;
		animation: toast-slide-in 0.3s ease-out;
	}

	@keyframes toast-slide-in {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	/* Type-specific border colors */
	.toast-info {
		border-color: var(--toast-info, #3b82f6);
	}

	.toast-success {
		border-color: var(--toast-success, #10b981);
	}

	.toast-warning {
		border-color: var(--toast-warning, #f59e0b);
	}

	.toast-error {
		border-color: var(--toast-error, #ef4444);
	}

	.toast-icon {
		flex-shrink: 0;
		font-size: 1.125rem;
		line-height: 1;
	}

	.toast-message {
		flex: 1;
		margin: 0;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--toast-text, #1e293b);
		word-break: break-word;
	}

	.toast-dismiss {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		color: var(--toast-dismiss, #64748b);
		transition: color 0.15s, background-color 0.15s;
	}

	.toast-dismiss:hover {
		color: var(--toast-dismiss-hover, #1e293b);
		background-color: rgba(0, 0, 0, 0.05);
	}

	.toast-dismiss:focus-visible {
		outline: 2px solid var(--toast-focus, #3b82f6);
		outline-offset: 2px;
	}

	.toast-dismiss svg {
		width: 100%;
		height: 100%;
	}
</style>