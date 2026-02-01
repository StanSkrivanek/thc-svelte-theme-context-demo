<!-- src/lib/components/tabs/TabList.svelte -->
<script lang="ts">
	import { getTabsContext } from './tabs-context.svelte'
	import type { Snippet } from 'svelte'

	interface Props {
		/** Additional CSS class */
		class?: string

		/** Tab trigger buttons */
		children: Snippet
	}

	let { class: className = '', children }: Props = $props()

	const tabs = getTabsContext()

	/**
	 * Handles keyboard navigation within the tab list.
	 * Arrow keys move focus between tabs.
	 * Home/End jump to first/last tab.
	 */
	function handleKeyDown(event: KeyboardEvent) {
		const currentIndex = tabs.tabIds.indexOf(tabs.activeTabId)
		if (currentIndex === -1) return

		let newIndex: number | null = null

		// Determine which keys to use based on orientation
		const isHorizontal = tabs.orientation === 'horizontal'
		const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'
		const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'

		switch (event.key) {
			case prevKey:
				// Move to previous tab, wrap to end
				newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.tabIds.length - 1
				break

			case nextKey:
				// Move to next tab, wrap to start
				newIndex = currentIndex < tabs.tabIds.length - 1 ? currentIndex + 1 : 0
				break

			case 'Home':
				newIndex = 0
				break

			case 'End':
				newIndex = tabs.tabIds.length - 1
				break

			default:
				return // Don't prevent default for other keys
		}

		if (newIndex !== null) {
			event.preventDefault()
			const newTabId = tabs.tabIds[newIndex]
			tabs.setActiveTab(newTabId)

			// Focus the newly active tab button
			const tabButton = document.getElementById(`tab-${newTabId}`)
			tabButton?.focus()
		}
	}
</script>

<div
	class="tab-list {className}"
	role="tablist"
	aria-orientation={tabs.orientation}
	onkeydown={handleKeyDown}
	tabindex="-1"
>
	{@render children()}
</div>

<style>
	.tab-list {
		display: flex;
		gap: 0.25rem;
		border-bottom: 1px solid var(--color-border, #e2e8f0);
	}

	:global([data-orientation='vertical']) .tab-list {
		flex-direction: column;
		border-bottom: none;
		border-right: 1px solid var(--color-border, #e2e8f0);
	}
</style>