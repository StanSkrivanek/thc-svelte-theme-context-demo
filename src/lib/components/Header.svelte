<!-- Header.svelte -->
<script>
	import { getContext } from 'svelte'
	import Logo from './Logo.svelte'
	import Navigation from './Navigation.svelte'

	// Header DOES use theme for styling
	const theme = getContext('theme')
</script>

<header
	style="background-color: {theme.colors.primary}; color: {theme.colors.text}; padding: {theme.spacing.md};"
>
	<div class="header-content">
		<Logo />
		<Navigation />
	</div>
</header>

<style>
	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1200px;
		margin: 0 auto;
	}
</style>