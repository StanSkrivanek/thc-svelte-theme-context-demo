<!-- src/lib/components/tabs/TabPanel.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTabsContext } from './tabs-context.svelte';

	interface Props {
		/** ID matching the associated Tab */
		id: string;

		/** Additional CSS class */
		class?: string;

		/** Panel content */
		children: Snippet;
	}

	let { id, class: className = '', children }: Props = $props();

	const tabs = getTabsContext();

	// Only render when this panel's tab is active
	let isActive = $derived(tabs.activeTabId === id);
</script>

{#if isActive}
	<div
		id="tabpanel-{id}"
		class="tab-panel {className}"
		role="tabpanel"
		aria-labelledby="tab-{id}"
		tabindex="0"
	>
		{@render children()}
	</div>
{/if}

<style>
	.tab-panel {
		padding: 1.5rem 0;
	}

	.tab-panel:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: 2px;
		border-radius: 4px;
	}
</style>
