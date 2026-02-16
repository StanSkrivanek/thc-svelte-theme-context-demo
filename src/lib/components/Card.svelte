<!-- src/lib/components/Card.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		children: Snippet;
	}

	let { title, subtitle, children }: Props = $props();
</script>

<article class="card">
	{#if title}
		<header class="card-header">
			<h3 class="card-title">{title}</h3>
			{#if subtitle}
				<p class="card-subtitle">{subtitle}</p>
			{/if}
		</header>
	{/if}

	<div class="card-body">
		{@render children()}
	</div>
</article>

<style>
	.card {
		background: var(--color-card);
		color: var(--color-card-foreground);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		transition:
			box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-header {
		padding: 1.5rem 1.5rem 1rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.4;
		letter-spacing: -0.01em;
	}

	.card-subtitle {
		margin: 0.5rem 0 0;
		color: var(--color-muted-foreground);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.card-body {
		padding: 1.5rem;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	/* Remove top padding if there's a header */
	.card-header + .card-body {
		padding-top: 0;
	}
</style>
