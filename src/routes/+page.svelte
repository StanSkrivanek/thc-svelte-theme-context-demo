<script lang="ts">
	import ThemeProvider from '$lib/theme/ThemeProvider.svelte';
</script>

<div class="page">
	<ThemeProvider forceTheme="dark">
		<section class="promo-card">
			<h2>Featured Content</h2>
			<p>This card is always dark, even on a light page.</p>
		</section>
	</ThemeProvider>
	<!-- This follows the page theme -->
	<section class="regular-card">
		<h2>Regular Content</h2>
		<p>This card follows the page theme.</p>
	</section>
</div>

<style>
	.promo-card,
	.regular-card {
		background-color: var(--color-surface);
		color: var(--color-foreground);
		border: 1px solid var(--color-border);
		padding: 1.5rem;
		border-radius: 12px;
		margin: 1rem 0;
	}
</style>
