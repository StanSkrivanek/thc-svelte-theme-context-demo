<!-- src/lib/components/toast/ToastProvider.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import { createToastContext, type ToastPosition } from './toast-context.svelte.js';

	interface Props {
		/** Default toast duration in milliseconds */
		defaultDuration?: number;

		/** Maximum visible toasts */
		maxToasts?: number;

		/** Viewport position */
		position?: ToastPosition;

		/** Child content */
		children: Snippet;
	}

	const {
		defaultDuration = 5000,
		maxToasts = 5,
		position = 'bottom-right',
		children
	}: Props = $props();

	// Create context during component initialization.
	// Wrap in `untrack` to intentionally capture initial prop values
	// and avoid state_referenced_locally warnings.
	untrack(() => {
		createToastContext(defaultDuration, maxToasts, position);
	});
</script>

{@render children()}
