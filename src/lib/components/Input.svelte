<!-- src/lib/components/Input.svelte -->
<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		class?: string;
	}

	let { class: className = '', ...rest }: Props = $props();
</script>

<input class="input {className}" {...rest} />

<style>
	.input {
		display: flex;
		height: 2.5rem;
		width: 100%;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-input);
		background: var(--color-background);
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
		color: var(--color-foreground);
		transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.input::placeholder {
		color: var(--color-muted-foreground);
	}

	.input:focus-visible {
		outline: 2px solid var(--color-ring);
		outline-offset: 2px;
	}

	.input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.input[type='file'] {
		border: 0;
		background: transparent;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0;
		height: auto;
	}
</style>
