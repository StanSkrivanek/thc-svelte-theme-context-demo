<!-- src/lib/components/tabs/Tab.svelte -->
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { getTabsContext } from './tabs-context.svelte';

	interface Props {
		/** Unique identifier for this tab */
		id: string;

		/** Whether this tab is disabled */
		disabled?: boolean;

		/** Additional CSS class */
		class?: string;

		/** Tab label content */
		children: Snippet;
	}

	let { id, disabled = false, class: className = '', children }: Props = $props();

	const tabs = getTabsContext();

	// Track previous id to support controlled re-registration
	let prevId: string | null = null;

	// Register this tab on mount, unregister on unmount
	onMount(() => {
		tabs.registerTab(id);
		prevId = id;

		return () => {
			// Unregister the latest known id
			tabs.unregisterTab(prevId ?? id);
		};
	});

	// If `id` changes at runtime, re-register under the new id
	// This is useful when:
	// 1. Localization: tab id mirrors a translated slug and can change with language.
	// 2. Data-driven tabs: API results rename or replace identifiers at runtime.
	// 3. Reordering/virtualization: recycled components get new ids as lists change.
	// 4. A/B variants: switching tab definitions without remounting the container.

	$effect(() => {
		if (prevId !== null && id !== prevId) {
			// Guard against id collisions: if new id already exists, keep prevId
			if (tabs.tabIds.includes(id)) {
				console.warn(`[Tabs] Duplicate tab id detected: "${id}". Keeping previous id: "${prevId}"`);
				return;
			}
			const wasActive = tabs.activeTabId === prevId;
			tabs.unregisterTab(prevId);
			tabs.registerTab(id);
			if (wasActive) {
				tabs.setActiveTab(id);
			}
			prevId = id;
		}
	});

	// Reactive check for active state
	let isActive = $derived(tabs.isActive(id));

	/**
	 * Handle tab selection on click.
	 */
	function handleClick() {
		if (!disabled) {
			tabs.setActiveTab(id);
		}
	}
</script>

<button
	type="button"
	id="tab-{id}"
	class="tab {className}"
	class:active={isActive}
	role="tab"
	aria-selected={isActive}
	aria-controls="tabpanel-{id}"
	tabindex={isActive ? 0 : -1}
	{disabled}
	onclick={handleClick}
>
	{@render children()}
</button>

<style>
	.tab {
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-foreground-muted, #64748b);
		background: transparent;
		border: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		cursor: pointer;
		transition:
			color 0.2s,
			border-color 0.2s;
		white-space: nowrap;
	}

	.tab:hover:not(:disabled) {
		color: var(--color-foreground, #1e293b);
	}

	.tab:focus-visible {
		outline: 2px solid var(--color-primary, #3b82f6);
		outline-offset: -2px;
		border-radius: 4px 4px 0 0;
	}

	.tab.active {
		color: var(--color-primary, #3b82f6);
		border-bottom-color: var(--color-primary, #3b82f6);
	}

	.tab:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Vertical orientation styles */
	:global([data-orientation='vertical']) .tab {
		border-bottom: none;
		border-right: 2px solid transparent;
		margin-bottom: 0;
		margin-right: -1px;
		text-align: left;
	}

	:global([data-orientation='vertical']) .tab.active {
		border-right-color: var(--color-primary, #3b82f6);
	}

	:global([data-orientation='vertical']) .tab:focus-visible {
		border-radius: 4px 0 0 4px;
	}
</style>
