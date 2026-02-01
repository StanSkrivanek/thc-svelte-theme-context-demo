<!-- src/lib/components/tabs/Tabs.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createTabsContext } from './tabs-context.svelte';

	interface Props {
		/** ID of the initially active tab */
		defaultTab?: string;

		/** Tab orientation */
		orientation?: 'horizontal' | 'vertical';

		/** Callback when active tab changes */
		onTabChange?: (tabId: string) => void;

		/** Additional CSS class */
		class?: string;

		/** Child content */
		children: Snippet;
	}

	let {
		defaultTab,
		orientation = 'horizontal',
		onTabChange,
		class: className = '',
		children
	}: Props = $props();

	// Create and provide the context synchronously so children
	// can access it during initial render (important for SSR)
	createTabsContext({
		get defaultTab() {
			return defaultTab;
		},
		get orientation() {
			return orientation;
		},
		onTabChange: (tabId: string) => onTabChange?.(tabId)
	});
</script>

<div class="tabs tabs-{orientation} {className}" data-orientation={orientation}>
	{@render children()}
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
	}

	.tabs-vertical {
		flex-direction: row;
	}
</style>
