<!-- NavMenu.svelte -->
<script>
	import NavItem from './NavItem.svelte'

	// NavMenu is structural, doesn't need theme
	// It just manages the list of navigation items
	const items = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Users', href: '/users' },
		{ label: 'Settings', href: '/settings' }
	]
</script>

<nav>
	<ul>
		{#each items as item}
			<li>
				<NavItem {item} />
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>