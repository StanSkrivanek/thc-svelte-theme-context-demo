<!-- Sidebar.svelte -->
<script>
	import NavMenu from './NavMenu.svelte'

	// Sidebar doesn't need theme directly - it's purely structural
	// It just passes components through without knowledge of context
</script>

<aside class="sidebar">
	<NavMenu />
</aside>

<style>
	.sidebar {
		width: 250px;
		border-right: 1px solid #e2e8f0;
	}
</style>