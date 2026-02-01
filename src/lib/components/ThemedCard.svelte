<!-- src/lib/components/ThemedCard.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<div class="themed-card">
	{@render children()}
</div>

<style>
	.themed-card {
		background-color: var(--color-surface);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
		border-radius: 12px;
		padding: 1.5rem;
		margin: 1rem 0;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.themed-card :global(h2) {
		margin: 0 0 0.5rem;
		color: var(--color-foreground);
	}

	.themed-card :global(p) {
		margin: 0;
		color: var(--color-foreground-muted);
	}
</style>