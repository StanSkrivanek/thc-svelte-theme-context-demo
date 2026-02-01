<!-- src/lib/components/toast/ToastViewport.svelte -->
<script lang="ts">
	import { getToastContext, getToastPosition } from './toast-context.svelte.js'
	import ToastItem from './ToastItem.svelte'

	interface Props {
		/** Additional CSS class */
		class?: string
	}

	let { class: className = '' }: Props = $props()

	const toastCtx = getToastContext()
	const position = getToastPosition()
</script>

<div
	class="toast-viewport {className}"
	data-position={position}
	role="region"
	aria-label="Notifications"
	aria-live="polite"
>
	{#each toastCtx.toasts as toast (toast.id)}
		<ToastItem {toast} ondismiss={() => toastCtx.dismiss(toast.id)} />
	{/each}
</div>

<style>
	.toast-viewport {
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		max-width: 420px;
		width: 100%;
		pointer-events: none;
	}

	/* Allow interaction with individual toasts */
	.toast-viewport > :global(*) {
		pointer-events: auto;
	}

	/* Position variants */
	[data-position='top-right'] {
		top: 0;
		right: 0;
	}

	[data-position='top-left'] {
		top: 0;
		left: 0;
	}

	[data-position='top-center'] {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	[data-position='bottom-right'] {
		bottom: 0;
		right: 0;
		flex-direction: column-reverse;
	}

	[data-position='bottom-left'] {
		bottom: 0;
		left: 0;
		flex-direction: column-reverse;
	}

	[data-position='bottom-center'] {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		flex-direction: column-reverse;
	}
</style>