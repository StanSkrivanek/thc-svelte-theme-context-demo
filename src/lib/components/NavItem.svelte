<!-- NavItem.svelte (4 levels deep from root layout) -->
<script>
	import { getContext } from 'svelte';

	// Accept the item prop using Svelte 5 $props rune
	let { item } = $props();

	// NavItem uses theme for styling - reaches all the way up through
	// NavMenu and Sidebar (which don't know about theme) to get it
	const theme = getContext('theme');
	// $inspect("Item ~ theme:", theme)
</script>

<!-- anchor use theme text color and spacing -->

<a
	href={item.href}
	style:color={theme.colors.text}
	style:padding="{theme.spacing.sm}
	{theme.spacing.md}"
>
	{item.label}
</a>

<style>
	a {
		display: block;
		text-decoration: none;
		border-radius: 4px;
		transition: background 0.2s;
	}

	a:hover {
		background: rgba(0, 0, 0, 0.05);
	}
</style>
