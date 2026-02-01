<!-- src/lib/components/Card.svelte -->
<script lang="ts">
	import { getContext, hasContext } from 'svelte';

	// --- Props ---
	interface Props {
		title?: string;
		subtitle?: string;
		variant?: 'default' | 'primary' | 'muted';
		children: import('svelte').Snippet;
	}

	let { title, subtitle, variant = 'default', children }: Props = $props();

	// --- Theme Context (optional with fallback) ---
	interface Theme {
		mode: 'light' | 'dark';
		colors: {
			primary: string;
			background: string;
			text: string;
			muted: string;
			border: string;
		};
		borderRadius: string;
		shadow: string;
	}

	const defaultTheme: Theme = {
		mode: 'light',
		colors: {
			primary: 'oklch(72.176% 0.1728 26.355)',
			background: '#ffffff',
			text: '#1a1a1a',
			muted: '#f5f5f5',
			border: '#e0e0e0'
		},
		borderRadius: '8px',
		shadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
	};

	// Strategy 2: Graceful fallback for optional context
	const theme: Theme = hasContext('theme') ? getContext('theme') : defaultTheme;

	// --- Derived Styling ---
	// Use $derived to react to theme changes
	let backgroundColor = $derived(
		{
			default: theme.colors.background,
			primary: theme.colors.primary,
			muted: theme.colors.muted
		}[variant]
	);

	let textColor = $derived(variant === 'primary' ? '#ffffff' : theme.colors.text);
</script>

<article
	class="card"
	class:dark={theme.mode === 'dark'}
	style="
		--card-bg: {backgroundColor};
		--card-text: {textColor};
		--card-border: {theme.colors.border};
		--card-radius: {theme.borderRadius};
		--card-shadow: {theme.shadow};
	"
>
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
		background: var(--card-bg);
		color: var(--card-text);
		border: 1px solid var(--card-border);
		border-radius: var(--card-radius);
		box-shadow: var(--card-shadow);
		overflow: hidden;
	}

	.card.dark {
		border-color: rgba(255, 255, 255, 0.1);
	}

	.card-header {
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--card-border);
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.card-subtitle {
		margin: 0.25rem 0 0;
		opacity: 0.7;
		font-size: 0.875rem;
	}

	.card-body {
		padding: 1.5rem;
	}
</style>
